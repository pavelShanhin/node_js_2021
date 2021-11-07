import { STRING, INTEGER, BOOLEAN } from 'sequelize';
import { sequelize } from '../index';
import { UserInstance } from '../index.types';

export const UserModel = sequelize.define<UserInstance>('user', {
    id: {
        type: STRING,
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
});
