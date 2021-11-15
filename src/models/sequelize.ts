import { SEQUELIZE_CONFIG } from '../configure';
import { Sequelize } from 'sequelize';
import { getUserModel } from './user.model';

console.log(SEQUELIZE_CONFIG, 'config')

export const sequelize = new Sequelize(SEQUELIZE_CONFIG);

export const UserModel = getUserModel(sequelize);
