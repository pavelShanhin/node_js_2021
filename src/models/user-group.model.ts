import { STRING, INTEGER, ARRAY, Sequelize } from 'sequelize';
import { UserGroupInstance } from '../types';

export const getUserGroupModel = (sequelize: Sequelize) => sequelize.define<UserGroupInstance>('userGroup', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    groups: {
        type: ARRAY(STRING),
        allowNull: false
    }
}, { timestamps: false });

