import { CreateGroupRequestSchema, UpdateGroupRequestSchema, GroupService, ErrorApi, LoggingService  } from '../../services';
import {
    ValidatedRequest
} from 'express-joi-validation';
import { GroupRequestParams } from '../../types';
import { Request, Response } from 'express';
import { GroupModel } from '../../models';
import {
  
    StatusCodes,

} from 'http-status-codes';

const groupService = new GroupService(GroupModel);

class GroupController {
    constructor() {}

    async createGroup(req: ValidatedRequest<CreateGroupRequestSchema>, res: Response, next: Function) {
        try {
            const createdGroup =  await groupService.createGroup(req.body);

            if (!createdGroup) {
                next(ErrorApi.badRequest('Group with this login has already been', req.method, LoggingService.getKeyValueString(req.body, 'body')));
                return;
            }

            res.status(StatusCodes.CREATED).send({ message: 'Group was created', createdGroup });
        } catch (error) {
            throw error;
        }
    }

    async updateGroup(req: ValidatedRequest<UpdateGroupRequestSchema>, res: Response, next:Function) {
        try {
            const updatedGroup = await groupService.updateGroup(req.body);

            if (updatedGroup) {
                res.status(StatusCodes.ACCEPTED).send({ message: 'Group was updated', updatedGroup });
            } else {
                next(ErrorApi.badRequest('Group has been not found', req.method, LoggingService.getKeyValueString(req.body, 'body')));
                return;
            }
        } catch (error) {
            throw error;
        }
    }

    async deleteGroup(req: Request, res: Response, next: Function) {
        try {
            const deletedGroup = await groupService.removeGroup(req.params.groupId);

            if (deletedGroup) {
                res.status(StatusCodes.OK).send({ message: 'Group was deleted', deletedGroup });
            }

            next(ErrorApi.badRequest('Group not found', req.method, LoggingService.getKeyValueString(req.params, 'params')));
            return;
        } catch (error) {
            throw error;
        }
    }

    async getGroup(req: Request, res: Response, next: Function) {
        try {
            const foundGroup = await groupService.getGroup(req.params);

            if (foundGroup) {
                res.status(StatusCodes.OK).send({ message: 'Group was found', foundGroup });
            }

            next(ErrorApi.badRequest('Group not found', req.method, LoggingService.getKeyValueString(req.params, 'params')));
            return;
        } catch (error) {
            throw error;
        }
    }

    async getGroups(req: Request & {query: GroupRequestParams}, res: Response, next: Function) {
        const { query } = req;

        try {
            const groups = await groupService.getGroupList(query);

            if (!groups) {
                next(ErrorApi.badRequest('Group not found', req.method, LoggingService.getKeyValueString(query, 'query')));
                return;
            }

            res.status(StatusCodes.OK).send({ message: 'Group were found', groups });
        } catch (error) {
            throw error;
        }
    }
}

export const groupController = new GroupController();
