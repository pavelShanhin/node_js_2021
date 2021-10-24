import express from 'express';
import { RequestParams } from '../index.types';
import { UserService } from '../services/user';
import {
    ValidatedRequest
} from 'express-joi-validation';
import { CreateRequestSchema, creationValidator, UpdateRequestSchema, updatingValidator } from '../services/validation';

export const userRouter = express.Router();

const userService = new UserService();

userRouter.post('/create', creationValidator, (req: ValidatedRequest<CreateRequestSchema>, res) => {
    const createdUser =  userService.createUser(req.body);

    if (!createdUser) {
        res.status(400).send({ message: 'User with this login has already been' });
    }

    res.status(200).send({ message: 'User was created', createdUser });
});

userRouter.put('/update', updatingValidator, (req: ValidatedRequest<UpdateRequestSchema>, res) => {
    const updateUser = userService.updateUser(req.body);

    if (updateUser) {
        res.status(200).send({ message: 'User was updated', updateUser });
    } else {
        res.status(400).send({ message: 'User has been not found' });
    }
});

userRouter.delete('/delete/:id', (req, res) => {
    const deletedUser = userService.deleteUser(req.params.id);

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
    console.log(req.query, 'query');
    const users = userService.getUsersList(req.query);

    res.status(200).send({ message: 'Users were found', users });
});
