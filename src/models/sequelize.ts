import { SEQUELIZE_CONFIG } from '../configure';
import { Sequelize } from 'sequelize';
import { getUserModel } from './user.model';
import { getGroupModel } from './group.model';

export const sequelize = new Sequelize(SEQUELIZE_CONFIG);

export const UserModel = getUserModel(sequelize);

export const GroupModel = getGroupModel(sequelize);

UserModel.belongsToMany(GroupModel, { through:'UserGroup' });
GroupModel.belongsToMany(UserModel, { through: 'UserGroup' });
