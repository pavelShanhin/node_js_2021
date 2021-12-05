import express from 'express';
import { LoggingService } from '../../services';
import { groupUserController } from '../controllers';

export const groupUserRouter = express.Router();

groupUserRouter.post('/', LoggingService.log('setUsersToGroups', 'body'), groupUserController.setUsersToGroups);
