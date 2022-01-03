import express from 'express';
import { GroupModel } from '../../models';
import { creationGroupValidator, GroupService, LoggingService, updatingGroupBodyValidator  } from '../../services';
import { GroupController } from '../controllers';

const groupService = new GroupService(GroupModel);
const groupController = new GroupController(groupService);

export const groupRouter = express.Router();

groupRouter.post('/', LoggingService.log('createGroup', 'body'), creationGroupValidator, groupController.createGroup);

groupRouter.put('/', LoggingService.log('updateGroup', 'body'), updatingGroupBodyValidator, groupController.updateGroup);

groupRouter.delete('/:groupId', LoggingService.log('deleteGroup', 'params'), groupController.deleteGroup);

groupRouter.get('/:groupId', LoggingService.log('getGroup', 'params'), groupController.getGroup);

groupRouter.get('/', LoggingService.log('getGroups', 'query'), groupController.getGroups);
