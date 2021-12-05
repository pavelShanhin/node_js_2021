import { Request, Response } from "express";
import {ErrorApi} from '../services/error';
import {logger} from '../loaders/winston'

export const apiErrorHandler = (err: Error, _req: Request, res: Response, _next: Function) => {
    if(err instanceof ErrorApi) {
        logger.error(err);
        res.status(err.code).json(err.message);
    }

    logger.error(err);
    res.status(500).json('Something went wrong');
}
