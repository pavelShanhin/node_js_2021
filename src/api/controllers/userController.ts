import { UserService, CreateRequestSchema, UpdateRequestSchema  } from '../../services';
import {
    ValidatedRequest
} from 'express-joi-validation';
import { RequestParams } from '../../types';
import { Request, Response } from 'express';
import { UserModel } from '../../models/index';

const userService = new UserService(UserModel);

class UserController {
    constructor() {}

    async createUser(req: ValidatedRequest<CreateRequestSchema>, res: Response) {
        try {
            const createdUser =  await userService.createUser(req.body);

            if (!createdUser) {
                res.status(400).send({ message: 'User with this login has already been' });
            }

            res.status(201).send({ message: 'User was created', createdUser });
        } catch (error) {
            throw error;
        }
    }

    async updateUser(req: ValidatedRequest<UpdateRequestSchema>, res: Response) {
        try {
            const updateUser = await userService.updateUser(req.body);

            if (updateUser) {
                res.status(204).send({ message: 'User was updated', updateUser });
            } else {
                res.status(400).send({ message: 'User has been not found' });
            }
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const deletedUser = await userService.softUserDelete(req.params.userId);

            if (deletedUser) {
                res.status(200).send({ message: 'User was deleted', deletedUser });
            }

            res.status(400).send({ message: 'User not found' });
        } catch (error) {
            throw error;
        }
    }

    async getUser(req: Request, res: Response) {
        try {
            const foundUser = await userService.getUser(req.params);

            if (foundUser) {
                res.status(200).send({ message: 'User was found', foundUser });
            }

            res.status(400).send({ message: 'User not found' });
        } catch (error) {
            throw error;
        }
    }

    async getUsers(req: {query: RequestParams}, res: Response) {
        try {
            const users = await userService.getUsersList(req.query);

            res.status(200).send({ message: 'Users were found', users });
        } catch (error) {
            throw error;
        }
    }
}

export const userController = new UserController();
