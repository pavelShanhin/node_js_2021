import express from 'express';
import { creationUserValidator, LoggingService, updatingUserBodyValidator, UserService  } from '../../services';
import { UserController } from '../controllers';
import { UserModel } from '../../models';

const userController = new UserController(new UserService(UserModel));
export const userRouter = express.Router();

userRouter.post('/', LoggingService.log('createUser', 'body'), creationUserValidator, userController.createUser);

userRouter.put('/', LoggingService.log('updateUser', 'body'), updatingUserBodyValidator, userController.updateUser);

userRouter.delete('/:userId', LoggingService.log('deleteUser', 'params'), userController.deleteUser);

userRouter.get('/:userId', LoggingService.log('getUser', 'params'), userController.getUser);

userRouter.get('/', LoggingService.log('getUsers', 'query'), userController.getUsers);

