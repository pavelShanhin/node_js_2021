import express from 'express';
import { creationValidator, updatingBodyValidator  } from '../services/index';
import { userController } from '../controllers/index';

export const userRouter = express.Router();

userRouter.post('/', creationValidator, userController.createUser);

userRouter.put('/', updatingBodyValidator, userController.updateUser);

userRouter.delete('/:userId', userController.deleteUser);

userRouter.get('/:userId', userController.getUser);

userRouter.get('/', userController.getUsers);

