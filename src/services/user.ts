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
            const users = await this.userModel.findAll({ limit, where: login ? { login: { [Op.like]: `%${login}%` } } : undefined, order: [['login', 'ASK']], raw: true });

            return users;
        } catch (error) {
            console.error(error);

            return null;
        }
    }

    async createUser(userData: CreateUserData) {
        // const { age, login, password } = userData;

        try {
            // const foundUser = await this.userModel.findOne({where: {login}});


            // if (foundUser) {
            //     return null;
            // }

            // const newUser = await this.userModel.create({age, login, password});

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

    async updateUser(userId: string, passedUser:UpdateUserData) {
        try {
            const [, updatedUser] = await this.userModel.update(passedUser, { where: { id: userId } });

            return updatedUser[0];
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
                const [, deletedUser] = await this.userModel.update({ age, login, password, isDeleted: true }, { where: { id: userId } });

                return deletedUser[0];
            }

            return null;
        } catch (error) {
            console.error(error);

            return null;
        }
    }
}
