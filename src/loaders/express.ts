import * as express from 'express';
import { ROUTERS_NAMES } from '../configure';
import { groupRouter, userRouter, groupUserRouter } from '../api';
import { apiErrorHandler } from './error-handler';
import {logger} from '../loaders/winston'

export const expressLoader = async ({ app }: { app: express.Application }):Promise<void> => {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
  
    app.get('/');

    app.use(ROUTERS_NAMES.users, userRouter);
    app.use(ROUTERS_NAMES.groups, groupRouter);
    app.use(ROUTERS_NAMES.userGroup, groupUserRouter);
    app.use(apiErrorHandler);

    process.on('uncaughtException', err => logger.error('uncaught exception: ', err))
    process.on('unhandledRejection', (reason, p) => logger.error('unhandled rejection: ', reason, p))
};
