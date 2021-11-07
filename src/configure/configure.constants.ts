import { Options } from 'sequelize';

export const PORT = 3000;

const  API_PART =  {
    usersManagement: '/users-management'
};

export const ROUTERS_NAMES = {
    users: `${API_PART.usersManagement}/users`
};

export const SEQUELIZE_CONFIG: Options = { dialect: 'postgres', host: 'localhost', port:5432 };

export const DB_NAME = 'postgres';
export const DB_USER_NAME = 'postgres';
export const DB_PASSWORD = '1234';
