import { ModelCtor, Op } from 'sequelize';
import { User, UserServiceInstance, RequestParams, UserInstance, CreateUserData, UpdateUserData } from '../types';

export class UserService implements UserServiceInstance {
    public userModel: ModelCtor<UserInstance>;

    constructor(userModel:ModelCtor<UserInstance>) {
        this.userModel = userModel;
    }

    async getUser({ userId }: RequestParams) {
        const foundUser = await this.userModel.findByPk(userId, { raw:true });
        const castUser = (foundUser as unknown) as User;

        return !castUser.isDeleted ? castUser : null;
    }

    async getUsersList({ login, limit }: RequestParams) {
        try {
            const whereParams = { 
                login: {
                    [Op.iLike]: `%${login}%`
                }, 
            };

            const users = await (await this.userModel.findAll({ where: login ? whereParams : undefined, order: [['id', 'ASC']], limit, raw: true }));

            return ((users as unknown) as User[]).filter(user => !user.isDeleted);
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

            const castNewUser = newUser as unknown as User;

            return castNewUser;
        } catch (error) {
            console.error(error);

            return null;
        }
    }

    async updateUser(passedUser:UpdateUserData) {
        try {
            const [result] = await this.userModel.upsert(passedUser, { returning: true });

            if (result) {
                const castNewUser = result as unknown as User;

                return castNewUser;
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
                const [numberOfUsers] = await this.userModel.update({ age, login, password, isDeleted: true }, { where: { id: userId } });

                if (numberOfUsers > 0) {
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
