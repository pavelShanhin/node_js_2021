import { Client } from 'pg';
import { CLIENT_CONNECT_CONFIG, createInsertUsersQuery, USERS_CREATE_TABLE_QUERY, USERS_DROP_TABLE_QUERY, INITIAL_USERS, GROUPS_DROP_TABLE_QUERY, GROUPS_CREATE_TABLE_QUERY, createInsertGroupQuery, INITIAL_GROUPS, USERS_GROUP_DROP_TABLE_QUERY  } from '../configure';

export const postgresLoader =  async (): Promise<void> => {
    const client = new Client(CLIENT_CONNECT_CONFIG);

    try {
        await client.connect();

        // Deleting relation table between users and groups
        await client.query(USERS_GROUP_DROP_TABLE_QUERY);

        // Creating users table and add initial values
        await client.query(USERS_DROP_TABLE_QUERY);
        await client.query(USERS_CREATE_TABLE_QUERY);
        await client.query(createInsertUsersQuery(INITIAL_USERS));

        // Creating groups table and add initial values
        await client.query(GROUPS_DROP_TABLE_QUERY);
        await client.query(GROUPS_CREATE_TABLE_QUERY);
        await client.query(createInsertGroupQuery(INITIAL_GROUPS));
    } catch (error) {
        throw error;
    } finally {
        await client.end();
    }
};
