import express from 'express';
import { creationValidator, updatingBodyValidator  } from '../../services';
import { userController } from '../controllers/userController';

export const userRouter = express.Router();

userRouter.post('/', creationValidator, userController.createUser);

userRouter.put('/', updatingBodyValidator, userController.updateUser);

userRouter.delete('/:userId', userController.deleteUser);

userRouter.get('/:userId', userController.getUser);

userRouter.get('/', userController.getUsers);

