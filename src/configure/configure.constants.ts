import { Options } from 'sequelize';

export const PORT = 3000;

const  API_PART =  {
    usersManagement: '/users-management'
};

export const ROUTERS_NAMES = {
    users: `${API_PART.usersManagement}/users`
};

export const SEQUELIZE_CONFIG: Options = {dialect: 'postgres'}

export const DB_NAME = 'usersdb';
export const DB_USER_NAME = 'root';
export const DB_PASSWORD = '1234';
