import { DB_NAME, DB_PASSWORD, DB_USER_NAME, SEQUELIZE_CONFIG } from '../configure/index';
import {Sequelize} from 'sequelize';
import {getUserModel} from './user.model'

export const sequelize = new Sequelize(DB_NAME, DB_USER_NAME, DB_PASSWORD, SEQUELIZE_CONFIG);

export const UserModel = getUserModel(sequelize);