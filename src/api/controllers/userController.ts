import { UserService, CreateUserRequestSchema, UpdateUserRequestSchema  } from '../../services';
import {
    ValidatedRequest
} from 'express-joi-validation';
import { UserRequestParams } from '../../types';
import { Request, Response } from 'express';
import { UserModel } from '../../models';
import {ErrorApi} from '../../services';

const userService = new UserService(UserModel);

class UserController {
    constructor() {}

    async createUser(req: ValidatedRequest<CreateUserRequestSchema>, res: Response, next:Function) {
        try {
            const createdUser =  await userService.createUser(req.body);

            if (!createdUser) {
                next(ErrorApi.badRequest('User with this login has already been'));
                return;
            }

            res.status(201).send({ message: 'User was created', createdUser });
        } catch (error) {
            throw error;
        }
    }

    async updateUser(req: ValidatedRequest<UpdateUserRequestSchema>, res: Response, next: Function) {
        try {
            const updateUser = await userService.updateUser(req.body);

            if (!updateUser) {
                next(ErrorApi.badRequest('User has been not found'));
                return;
                
            } 

            res.status(204).send({ message: 'User was updated', updateUser });
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(req: Request, res: Response, next:Function) {
        try {
            const deletedUser = await userService.softUserDelete(req.params.userId);

            if (!deletedUser) {
                next(ErrorApi.badRequest('User has been not found'));
                return;
            }

            res.status(200).send({ message: 'User was deleted', deletedUser });
            
        } catch (error) {
            throw error;
        }
    }

    async getUser(req: Request, res: Response, next:Function) {
        try {
            const foundUser = await userService.getUser(req.params);

            if (!foundUser) {
                next(ErrorApi.badRequest('User has been not found'));
                return;
            }

            res.status(200).send({ message: 'User was found', foundUser });
        } catch (error) {
            throw error;
        }
    }

    async getUsers(req: {query: UserRequestParams}, res: Response) {
        try {
            const users = await userService.getUsersList(req.query);

            res.status(200).send({ message: 'Users were found', users });
        } catch (error) {
            throw error;
        }
    }
}

export const userController = new UserController();

