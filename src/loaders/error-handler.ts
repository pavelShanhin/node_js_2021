import { Request, Response } from "express";
import {ErrorApi} from '../services/error'

export const apiErrorHandler = (err: Error, req: Request, res: Response, next: Function) => {
    if(err instanceof ErrorApi) {
        res.status(err.code).json(err.message);
    }

    res.status(500).json('Something went wrong');
}