import { Options } from 'sequelize';
import { CreateGroupData, CreateUserData, Permissions } from '../types';
import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT;

export const ROUTERS_NAMES = {
    users: '/users',
    groups: '/groups',
    userGroup: '/userGroup'
};

const COMMON_CONFIG = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT)
};

const INITIAL_CONNECT_CONFIG = {
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS
};

export const SEQUELIZE_CONFIG: Options = { dialect: 'postgres', username: INITIAL_CONNECT_CONFIG.user, password: INITIAL_CONNECT_CONFIG.password, ...COMMON_CONFIG };
export const CLIENT_CONNECT_CONFIG = {
    ...COMMON_CONFIG, ...INITIAL_CONNECT_CONFIG
};

export const USERS_DROP_TABLE_QUERY = 'DROP TABLE IF EXISTS "users"';
export const USERS_CREATE_TABLE_QUERY = 'CREATE TABLE IF NOT EXISTS "users" ("id" SERIAL, "login" VARCHAR NOT NULL, "age" INTEGER, "password" VARCHAR NOT NULL, "isDeleted" BOOLEAN DEFAULT false, PRIMARY KEY ("id"));';

export const INITIAL_USERS: CreateUserData[] = [
    { age: 56, login: 'Vasili', password: '253698v' },
    { age: 40, login: 'Petr', password: '285698v' },
    { age: 30, login: 'Nikolai', password: '259998v' }
];

export const INITIAL_GROUPS: CreateGroupData[] = [
    { name: 'Bears', permissions: [Permissions.READ, Permissions.SHARE] },
    { name: 'Bulls', permissions: [Permissions.READ, Permissions.SHARE] },
    { name: 'Cats', permissions: [Permissions.READ, Permissions.SHARE] }
];

export const GROUPS_DROP_TABLE_QUERY = 'DROP TABLE IF EXISTS "groups"';
export const GROUPS_CREATE_TABLE_QUERY = 'CREATE TABLE IF NOT EXISTS "groups" ("id" SERIAL, "name" VARCHAR NOT NULL, "permissions" TEXT ARRAY, PRIMARY KEY ("id"));';

export const USERS_GROUP_DROP_TABLE_QUERY = 'DROP TABLE IF EXISTS "UserGroup"';

