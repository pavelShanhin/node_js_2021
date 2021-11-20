import { CreateGroupRequestSchema, UpdateGroupRequestSchema, GroupService  } from '../../services';
import {
    ValidatedRequest
} from 'express-joi-validation';
import { GroupRequestParams } from '../../types';
import { Request, Response } from 'express';
import { GroupModel } from '../../models';

const groupService = new GroupService(GroupModel);

class GroupController {
    constructor() {}

    async createGroup(req: ValidatedRequest<CreateGroupRequestSchema>, res: Response) {
        console.log(req.body,'req body')
        try {
            const createdGroup =  await groupService.createGroup(req.body);

            if (!createdGroup) {
                res.status(400).send({ message: 'Group with this login has already been' });
            }

            res.status(201).send({ message: 'Group was created', createdGroup });
        } catch (error) {
            throw error;
        }
    }

    async updateGroup(req: ValidatedRequest<UpdateGroupRequestSchema>, res: Response) {
        try {
            const updatedGroup = await groupService.updateGroup(req.body);

            if (updatedGroup) {
                res.status(204).send({ message: 'Group was updated', updatedGroup });
            } else {
                res.status(400).send({ message: 'Group has been not found' });
            }
        } catch (error) {
            throw error;
        }
    }

    async deleteGroup(req: Request, res: Response) {
        try {
            const deletedGroup = await groupService.removeGroup(req.params.groupId);

            if (deletedGroup) {
                res.status(200).send({ message: 'Group was deleted', deletedGroup });
            }

            res.status(400).send({ message: 'Group not found' });
        } catch (error) {
            throw error;
        }
    }

    async getGroup(req: Request, res: Response) {
        try {
            const foundGroup = await groupService.getGroup(req.params);

            if (foundGroup) {
                res.status(200).send({ message: 'Group was found', foundGroup });
            }

            res.status(400).send({ message: 'Group not found' });
        } catch (error) {
            throw error;
        }
    }

    async getGroups(req: {query: GroupRequestParams}, res: Response) {
        try {
            const groups = await groupService.getGroupList(req.query);

            res.status(200).send({ message: 'Group were found', groups });
        } catch (error) {
            throw error;
        }
    }
}

export const groupController = new GroupController();
