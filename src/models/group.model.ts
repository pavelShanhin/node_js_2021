import { STRING, INTEGER, ARRAY, Sequelize } from 'sequelize';
import { GroupInstance } from '../types';

export const getGroupModel = (sequelize: Sequelize) => sequelize.define<GroupInstance>('group', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: STRING,
        allowNull: false
    },
    permissions: {
        type: ARRAY(STRING),
        allowNull: false
    },
}, { timestamps: false });

