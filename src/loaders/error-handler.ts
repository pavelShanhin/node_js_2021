import { Request, Response } from 'express';
import { ErrorApi } from '../services/error';
import { logger } from '../loaders/winston';
import {getReasonPhrase, StatusCodes} from 'http-status-codes'

export const apiErrorHandler = (err: Error, _req: Request, res: Response, _next: Function) => {
    if (err instanceof ErrorApi) {
        logger.error(err);
        res.status(err.code).json(err.message);
    }

    logger.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
};
