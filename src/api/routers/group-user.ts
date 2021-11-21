import express from 'express';
import { groupUserController } from '../controllers/groupUserController';

export const groupUserRouter = express.Router();

groupUserRouter.post('/', groupUserController.getSomething);
