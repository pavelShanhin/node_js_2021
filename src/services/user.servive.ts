import { INITIAL_USERS } from './services.constants';
import { generateId, sortingCallback } from './services.helpers';
import { User, UserServiceInstance, CreateUserData, RequestParams } from '../index.types';

export class UserService implements UserServiceInstance {
    private users: User[] = [...INITIAL_USERS] ;

    constructor() {}

    getUser({ userId }: RequestParams) {
        const foundUser = this.users.find(({ id }) => id === userId);

        return foundUser;
    }

    getUsersList({ login, limit }: RequestParams) {
        if (!login) {
            return this.users.slice(0, limit);
        }

        const lowerCasePassedString = login.toLowerCase();
        const usersBySubstring  = this.users.filter((user) => user.login.toLowerCase().indexOf(lowerCasePassedString) !== -1);
        const sortedUsers = usersBySubstring.sort(sortingCallback);

        return sortedUsers.slice(0, limit);
    }

    createUser(userData: CreateUserData) {
        const { age, login, password } = userData;

        const foundUser = this.users.find((user) => user.login === login);

        if (foundUser) {
            return undefined;
        }

        const newUser: User = { id: generateId(), login, age, password, isDeleted:false };

        this.users.push(newUser);

        return newUser;
    }

    updateUser(passedUser: User) {
        const foundUserIndex = this.users.findIndex(({ id }) => id === `${passedUser.id}`);

        if (foundUserIndex === -1) {
            return undefined;
        }

        this.users[foundUserIndex] = { ...passedUser };

        return this.users[foundUserIndex];
    }

    deleteUser(userId: string) {
        const foundUserIndex = this.users.findIndex((user) => userId === user.id);

        this.users[foundUserIndex].isDeleted = true;

        return this.users[foundUserIndex];
    }
}
