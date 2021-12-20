import * as express from 'express';
import {  ROUTERS_NAMES } from '../configure';
import { groupRouter, userRouter, groupUserRouter, authRouter } from '../api';
import { apiErrorHandler } from './error-handler';
import { logger } from '../loaders/winston';
import { authService } from '../services/';
import cors from 'cors';

export const expressLoader = async ({ app }: { app: express.Application }):Promise<void> => {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.get('/');

    app.use(cors())

    app.use(ROUTERS_NAMES.auth, authRouter);

    app.use(authService.authentificateUser);

    app.use(ROUTERS_NAMES.users, userRouter);
    app.use(ROUTERS_NAMES.groups, groupRouter);
    app.use(ROUTERS_NAMES.userGroup, groupUserRouter);
    app.use(apiErrorHandler);

    process.on('uncaughtException', err => logger.error('uncaught exception: ', err));
    process.on('unhandledRejection', (reason) => {
        logger.error('Unhandled rejection');
        throw reason;
    });
};
