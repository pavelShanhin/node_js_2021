import express from 'express';
import { creationUserValidator, updatingUserBodyValidator  } from '../../services';
import { userController } from '../controllers/userController';

export const userRouter = express.Router();

userRouter.post('/', creationUserValidator, userController.createUser);

userRouter.put('/', updatingUserBodyValidator, userController.updateUser);

userRouter.delete('/:userId', userController.deleteUser);

userRouter.get('/:userId', userController.getUser);

userRouter.get('/', userController.getUsers);

