import * as express from 'express';
import { ROUTERS_NAMES } from '../configure';
import { groupRouter, userRouter, groupUserRouter } from '../api';

export const expressLoader = async ({ app }: { app: express.Application }):Promise<void> => {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.get('/');

    app.use(ROUTERS_NAMES.users, userRouter);
    app.use(ROUTERS_NAMES.groups, groupRouter);
    app.use(ROUTERS_NAMES.userGroup, groupUserRouter);
};
