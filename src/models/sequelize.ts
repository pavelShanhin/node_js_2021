import { SEQUELIZE_CONFIG } from '../configure';
import { Sequelize } from 'sequelize';
import { getUserModel } from './user.model';
import { getGroupModel } from './group.model';
import { getUserGroupModel } from './user-group.model';

export const sequelize = new Sequelize(SEQUELIZE_CONFIG);

export const UserModel = getUserModel(sequelize);

export const GroupModel = getGroupModel(sequelize);

export const UserGroupModel = getUserGroupModel(sequelize);

UserModel.belongsToMany(GroupModel, { through: UserGroupModel });
GroupModel.belongsToMany(UserModel, { through: UserGroupModel });
