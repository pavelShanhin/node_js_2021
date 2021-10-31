import express from 'express';
import { RequestParams } from '../index.types';
import { UserService } from '../services/user';
import {
    ValidatedRequest
} from 'express-joi-validation';
import { CreateRequestSchema, creationValidator, UpdateRequestSchema, updatingBodyValidator, updatingParamsValidator  } from '../services/validation';

export const userRouter = express.Router();

const userService = new UserService();

userRouter.post('/', creationValidator, (req: ValidatedRequest<CreateRequestSchema>, res) => {
    const createdUser =  userService.createUser(req.body);

    if (!createdUser) {
        res.status(400).send({ message: 'User with this login has already been' });
    }

    res.status(201).send({ message: 'User was created', createdUser });
});

userRouter.put('/:userId', updatingParamsValidator, updatingBodyValidator, (req: ValidatedRequest<UpdateRequestSchema>, res) => {
    const updateUser = userService.updateUser(req.params.userId, req.body);

    if (updateUser) {
        res.status(204).send({ message: 'User was updated', updateUser });
    } else {
        res.status(400).send({ message: 'User has been not found' });
    }
});

userRouter.delete('/:userId', (req, res) => {
    const deletedUser = userService.deleteUser(req.params.userId);

    if (deletedUser) {
        res.status(200).send({ message: 'User was deleted', deletedUser });
    }

    res.status(400).send({ message: 'User not found' });
});

userRouter.get('/:userId', (req, res) => {
    const foundUser = userService.getUser(req.params);

    if (foundUser) {
        res.status(200).send({ message: 'User was found', foundUser });
    }

    res.status(400).send({ message: 'User not found' });
});

userRouter.get('/', (req: {query: RequestParams}, res) => {
    const users = userService.getUsersList(req.query);

    res.status(200).send({ message: 'Users were found', users });
});
