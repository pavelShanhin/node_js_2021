import * as express from 'express';
import { ROUTERS_NAMES } from '../configure';
import { userRouter } from '../api';

export const expressLoader = async ({ app }: { app: express.Application }):Promise<void> => {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.get('/', (_req, res) => {
        res.status(400).send({ message: 'This type of request is not handle' });
    });

    app.use(ROUTERS_NAMES.users, userRouter);
};
