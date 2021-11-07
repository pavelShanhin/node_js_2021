import { ModelCtor, Op } from 'sequelize';
import { User, UserServiceInstance, RequestParams, UserInstance, CreateUserData, UpdateUserData } from '../index.types';

export class UserService implements UserServiceInstance {
    public userModel: ModelCtor<UserInstance>;

    constructor(userModel:ModelCtor<UserInstance>) {
        this.userModel = userModel;
    }

    async getUser({ userId }: RequestParams) {
        const foundUser = await this.userModel.findByPk(userId, { raw:true });

        return foundUser;
    }

    async getUsersList({ login, limit }: RequestParams) {
        try {
            const whereParams = { login: {
                [Op.iLike]: `%${login}%`
            } };

            const users = await this.userModel.findAll({ where: login ? whereParams : undefined, order: [['id', 'ASC']], limit, raw: true });

            return users;
        } catch (error) {
            console.error(error);

            return null;
        }
    }

    async createUser(userData: CreateUserData) {
        try {
            const [newUser, isCreated] = await this.userModel.findOrCreate({ where: userData, raw:true });

            if (!isCreated) {
                return null;
            }

            return newUser;
        } catch (error) {
            console.error(error);

            return null;
        }
    }

    async updateUser(passedUser:UpdateUserData) {
        try {
            const [result] = await this.userModel.upsert(passedUser, { returning: true });

            if (result) {
                return result;
            }

            return null;
        } catch (error) {
            console.error(error);

            return null;
        }
    }

    async softUserDelete(userId: string) {
        try {
            const foundUser = await this.userModel.findByPk(userId, { raw: true });

            if (foundUser) {
                const { age, login, password } = (foundUser as unknown) as User;
                await this.userModel.update({ age, login, password, isDeleted: true }, { where: { id: userId } });
                const result = await this.userModel.destroy({ where: { id: userId } });

                if (result > 0) {
                    return 1;
                }

                return null;
            }

            return null;
        } catch (error) {
            console.error(error);

            return null;
        }
    }
}
