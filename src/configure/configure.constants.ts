import { Options } from 'sequelize';
import { CreateUserData } from '../types';

export const PORT = 3000;

export const ROUTERS_NAMES = {
    users: '/users'
};

export const DB_NAME = 'postgres';
export const DB_USER_NAME = 'postgres';
export const DB_PASSWORD = '1234';
export const DB_HOST = 'localhost';
export const DB_PORT = 5432;

export const SEQUELIZE_CONFIG: Options = { dialect: 'postgres', host: 'localhost', port:5432 };
export const CONNECT_CONFIG = {
    host: DB_HOST,
    user: DB_USER_NAME,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: DB_PORT
};

export const DROP_TABLE_QUERY = 'DROP TABLE IF EXISTS "users"'
export const CREATE_TABLE_QUERY = 'CREATE TABLE IF NOT EXISTS "users" ("id" SERIAL, "login" VARCHAR NOT NULL, "age" INTEGER, "password" VARCHAR NOT NULL, "isDeleted" BOOLEAN DEFAULT false, PRIMARY KEY ("id"));';

export const INITIAL_USERS: CreateUserData[] = [
    { age: 56, login: 'Vasili', password: '253698v'},
    { age: 40, login: 'Petr', password: '285698v' },
    { age: 30, login: 'Nikolai', password: '259998v' }
];
