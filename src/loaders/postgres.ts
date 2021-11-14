import { Client } from 'pg';
import { CONNECT_CONFIG, createInsertUsersQuery, CREATE_TABLE_QUERY, DROP_TABLE_QUERY, INITIAL_USERS  } from '../configure';

export const postgresLoader =  async (): Promise<void> => {
    const client = new Client(CONNECT_CONFIG);

    try {
        await client.connect();
        await client.query(DROP_TABLE_QUERY);
        await client.query(CREATE_TABLE_QUERY);
        await client.query(createInsertUsersQuery(INITIAL_USERS));
    } catch (error) {
        throw error;
    } finally {
        await client.end();
    }
};
