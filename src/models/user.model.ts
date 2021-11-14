import { STRING, INTEGER, BOOLEAN, Sequelize } from 'sequelize';
import { UserInstance } from '../types';

export const getUserModel = (sequelize: Sequelize) => sequelize.define<UserInstance>('user', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    login: {
        type: STRING,
        allowNull: false
    },
    password: {
        type: STRING,
        allowNull: false
    },
    age: {
        type: INTEGER,
        allowNull: false
    },
    isDeleted: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, { timestamps: false });

