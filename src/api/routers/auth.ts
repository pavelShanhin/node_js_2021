import express from 'express';
import { LoggingService, loginValidation } from '../../services';
import { authController } from '../controllers';

export const authRouter = express.Router();

authRouter.post('/', LoggingService.log('login', 'body'), loginValidation, authController.login);
