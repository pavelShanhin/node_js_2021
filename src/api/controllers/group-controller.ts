import { CreateGroupRequestSchema, UpdateGroupRequestSchema, GroupService, ErrorApi, LoggingService  } from '../../services';
import {
    ValidatedRequest
} from 'express-joi-validation';
import { GroupRequestParams } from '../../types';
import { Request, Response } from 'express';
import {

    StatusCodes

} from 'http-status-codes';

export class GroupController {
    private groupService: GroupService;

    constructor(groupService: GroupService) {
        this.groupService = groupService;
    }

    async createGroup(req: ValidatedRequest<CreateGroupRequestSchema>, res: Response, next: Function) {
        try {
            const createdGroup =  await this.groupService.createGroup(req.body);

            if (!createdGroup) {
                next(ErrorApi.badRequest('Group with this name has already been', req.method, LoggingService.getKeyValueString(req.body, 'body')));
                return;
            }

            res.status(StatusCodes.CREATED).send({ message: 'Group was created', createdGroup });
        } catch (error) {
            throw error;
        }
    }

    async updateGroup(req: ValidatedRequest<UpdateGroupRequestSchema>, res: Response, next:Function) {
        try {
            const updatedGroup = await this.groupService.updateGroup(req.body);

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
            const deletedGroup = await this.groupService.removeGroup(req.params.groupId);

            if (deletedGroup) {
                res.status(StatusCodes.OK).send({ message: 'Group was deleted', deletedGroup });
            }

            next(ErrorApi.badRequest('Group has not been found', req.method, LoggingService.getKeyValueString(req.params, 'params')));
            return;
        } catch (error) {
            throw error;
        }
    }

    async getGroup(req: Request, res: Response, next: Function) {
        try {
            const foundGroup = await this.groupService.getGroup(req.params);

            if (foundGroup) {
                res.status(StatusCodes.OK).send({ message: 'Group was found', foundGroup });
            }

            next(ErrorApi.badRequest('Group has not been found', req.method, LoggingService.getKeyValueString(req.params, 'params')));
            return;
        } catch (error) {
            throw error;
        }
    }

    async getGroups(req: Request & {query: GroupRequestParams}, res: Response, next: Function) {
        try {
            const groups = await this.groupService.getGroupList();

            if (!groups) {
                next(ErrorApi.badRequest('Groups have not been found', req.method));
                return;
            }

            res.status(StatusCodes.OK).send({ message: 'Group were found', groups });
        } catch (error) {
            throw error;
        }
    }
}

