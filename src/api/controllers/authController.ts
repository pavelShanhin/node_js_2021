import { authService, LoginUserRequestSchema   } from '../../services';
import {  Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';

class AuthController {
    constructor() {}

    async login(req: ValidatedRequest<LoginUserRequestSchema>, res: Response) {
        try {
            const userDataWithToken =  await authService.login(req.body.login, req.body.password);

            res.status(200).send(userDataWithToken);
        } catch (error) {
            throw error;
        }
    }
}

export const authController = new AuthController();
