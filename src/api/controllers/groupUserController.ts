import { GroupUserService   } from '../../services';
import { Request, Response } from 'express';
import { GroupModel } from '../../models';
import {
    StatusCodes
} from 'http-status-codes';

const userGroupService = new GroupUserService(GroupModel);

class GroupUserController {
    constructor() {}

    async setUsersToGroups(req: Request, res: Response) {
        try {
            const createdGroup =  await userGroupService.addUsersToGroup(req.body);

            res.status(StatusCodes.CREATED).send({ message: 'Group was added', createdGroup });
        } catch (error) {
            throw error;
        }
    }
}

export const groupUserController = new GroupUserController();
