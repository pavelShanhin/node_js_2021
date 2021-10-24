import { User } from '../index.types';

export const generateId = (): string => (new Date()).getTime().toString(36);

export const sortingCallback = (user: User, nextUser: User): number => {
    const userLowerCase = user.login.toLowerCase();
    const nextUserLowerCase = nextUser.login.toLowerCase();

    if (userLowerCase < nextUserLowerCase) {
        return -1;
    }

    if (userLowerCase > nextUserLowerCase) {
        return 1;
    }

    return 0;
};
