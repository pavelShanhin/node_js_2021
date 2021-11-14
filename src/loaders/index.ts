import { expressLoader } from './express';
import express from 'express';
import { postgresLoader } from './postgres';

export const init =  async ({ expressApp }: { expressApp: express.Application }) => {
    try {
        await postgresLoader();
        await expressLoader({ app: expressApp });
    } catch (error) {
        throw error;
    }
};
