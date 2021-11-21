import express from 'express';
import { creationGroupValidator, updatingGroupBodyValidator  } from '../../services';
import { groupController } from '../controllers/groupController';

export const groupRouter = express.Router();

groupRouter.post('/', creationGroupValidator, groupController.createGroup);

groupRouter.put('/', updatingGroupBodyValidator, groupController.updateGroup);

groupRouter.delete('/:groupId', groupController.deleteGroup);

groupRouter.get('/:groupId', groupController.getGroup);

groupRouter.get('/', groupController.getGroups);
