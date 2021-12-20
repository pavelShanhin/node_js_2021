import { Request, Response } from 'express';
import { ModelCtor } from 'sequelize/types';
import { ErrorApi } from './error';
import { AuthUserData, AuthUserDataWithToken, User, UserInstance } from '../types';
import crypto from 'crypto';
import { UserModel } from '../models';
import { JWT_SECRET } from '../configure';

class AuthService {
    public expiration = '6h';
    public userModel: ModelCtor<UserInstance>;

    constructor(userModel:ModelCtor<UserInstance>) {
        this.userModel = userModel;
    }

    private async generateToken(user: User) {
        const { id, login: userLogin } = user;

        const head = Buffer.from(
            JSON.stringify({ alg: 'HS256', typ: 'jwt' })
        ).toString('base64');

        const body = Buffer.from(JSON.stringify({ id, login: userLogin })).toString(
            'base64'
        );

        const signature = crypto
            .createHmac('SHA256', JWT_SECRET)
            .update(`${head}.${body}`)
            .digest('base64');

        return `${head}.${body}.${signature}`;
    }

    async login(login: string, password: string): Promise<AuthUserDataWithToken> {
        try {
            const foundUser = await this.userModel.findOne({ where: { login }, raw: true });

            if (foundUser) {
                const castUser = (foundUser as unknown) as User;
                const { id, login: userLogin, age, password: foundUserPassword } = castUser;
                const token = await this.generateToken(castUser);

                if (foundUserPassword === password) {
                    return {
                        user: {
                            id,
                            login: userLogin,
                            age
                        },
                        token
                    };
                }
                throw ErrorApi.internalError('Password is incorrect');
            } else {
                throw ErrorApi.internalError('User not found');
            }
        } catch (error) {
            throw ErrorApi.internalError((error as Error).message);
        }
    }

    async authentificateUser(req: Request, _res: Response, next: Function) {
        if (req.headers.authorization) {
            const tokenParts = req.headers.authorization
                .split(' ')[1]
                .split('.');

            const signature = await crypto
                .createHmac('SHA256', JWT_SECRET)
                .update(`${tokenParts[0]}.${tokenParts[1]}`)
                .digest('base64');

            if (signature === tokenParts[2]) {
                ((req as unknown) as {currentUser: AuthUserData}).currentUser = JSON.parse(
                    Buffer.from(tokenParts[1], 'base64').toString(
                        'utf8'
                    )
                ) as AuthUserData;

                next();
                return;
            }

            next(ErrorApi.forbiddenError('Forbidden'));
            return;
        }

        next(ErrorApi.unAuthorizedError('Unauthorized'));
        return;
    }
}

export const authService = new AuthService(UserModel);
