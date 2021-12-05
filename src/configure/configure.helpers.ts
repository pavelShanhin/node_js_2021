import { CreateGroupData, CreateUserData } from '../types';

export const createInsertUsersQuery = (users: CreateUserData[]) =>  {
    const insertUsersQuery = 'INSERT INTO users (login, age, password) VALUES ';

    return users.reduce((acc, { age, login, password }, index) => {
        return `${acc  }('${login}', ${age}, '${password}')${index === users.length - 1 ? '' : ','}`;
    }, insertUsersQuery);
};

export const createInsertGroupQuery = (groups: CreateGroupData[]) => {
    const insertGroupsQuery = 'INSERT INTO groups (name, permissions) VALUES ';

    return groups.reduce((acc, { permissions, name }, outerIndex) => {
        const permissionsValue = permissions.reduce((permissionAcc, permission, innerIndex) => `${permissionAcc }${permission}${innerIndex === permissions.length - 1 ? '' : ','}`, '');

        return `${acc  }('${name}', '{${permissionsValue}}')${outerIndex === groups.length - 1 ? '' : ','}`;
    }, insertGroupsQuery);
};