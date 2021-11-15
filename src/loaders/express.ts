import * as express from 'express';
import { ROUTERS_NAMES } from '../configure';
import { userRouter } from '../api';

export const expressLoader = async ({ app }: { app: express.Application }):Promise<void> => {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.get('/');

    app.use(ROUTERS_NAMES.users, userRouter);
};
