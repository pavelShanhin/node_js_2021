import {  CreateUserRequestSchema, UpdateUserRequestSchema, LoggingService  } from '../../services';
import {
    ValidatedRequest
} from 'express-joi-validation';
import { UserService } from '../../services/user';
import { UserRequestParams } from '../../types';
import { Request, Response } from 'express';
import { ErrorApi } from '../../services';
import {

    StatusCodes

} from 'http-status-codes';

export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    async createUser(req: ValidatedRequest<CreateUserRequestSchema>, res: Response, next:Function) {
        try {
            const createdUser =  await this.userService.createUser(req.body);

            if (!createdUser) {
                next(ErrorApi.badRequest('User with this login has already been', req.method, LoggingService.getKeyValueString(req.body, 'body')));
                return;
            }


            res.status(StatusCodes.CREATED).send({ message: 'User was created', createdUser });
        } catch (error) {
            throw error;
        }
    }

    async updateUser(req: ValidatedRequest<UpdateUserRequestSchema>, res: Response, next: Function) {
        try {
            const updateUser = await this.userService.updateUser(req.body);

            if (!updateUser) {
                next(ErrorApi.badRequest('User has been not found',  req.method, LoggingService.getKeyValueString(req.body, 'body')));
                return;
            }

            res.status(StatusCodes.OK).send({ message: 'User was updated', updateUser });
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(req: Request, res: Response, next:Function) {
        try {
            const deletedUser = await this.userService.softUserDelete(req.params.userId);

            if (!deletedUser) {
                next(ErrorApi.badRequest('User has been not found',  req.method, LoggingService.getKeyValueString(req.params, 'params')));
                return;
            }

            res.status(StatusCodes.OK).send({ message: 'User was deleted', deletedUser });
        } catch (error) {
            throw error;
        }
    }

    async getUser(req: Request, res: Response, next:Function) {
        try {
            const foundUser = await this.userService.getUser(req.params);

            if (!foundUser) {
                next(ErrorApi.badRequest('User has been not found', req.method, LoggingService.getKeyValueString(req.params, 'params')));
                return;
            }

            res.status(StatusCodes.OK).send({ message: 'User was found', foundUser });
        } catch (error) {
            throw error;
        }
    }

    async getUsers(req: Request & {query: UserRequestParams}, res: Response, next: Function) {
        const { query } = req;

        try {
            const users = await this.userService.getUsersList(query);

            if (!users) {
                next(ErrorApi.badRequest('Users have been not found', req.method, LoggingService.getKeyValueString(query, 'query')));
                return;
            }


            res.status(StatusCodes.OK).send({ message: 'Users were found', users });
        } catch (error) {
            throw error;
        }
    }
}
