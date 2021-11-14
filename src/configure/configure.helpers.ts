import { CreateUserData } from '../types';

export const createInsertUsersQuery = (users: CreateUserData[]) =>  {
    const insertUsersQuery = 'INSERT INTO users (login, age, password) VALUES ';

    return users.reduce((acc, { age, login, password }, index) => {
        return `${acc  }('${login}', ${age}, '${password}')${index === users.length - 1 ? '' : ','}`;
    }, insertUsersQuery);
};
