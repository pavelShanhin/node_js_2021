import { GroupUserService   } from '../../services';
import { Request, Response } from 'express';
import { GroupModel, UserGroupModel, UserModel } from '../../models';

const userGroupService = new GroupUserService(UserGroupModel, UserModel, GroupModel);

class GroupUserController {
    constructor() {}

    async getSomething(req: Request, res: Response) {
        try {
            const createdGroup =  await userGroupService.addUsersToGroup(req.body);

            if (!createdGroup) {
                res.status(400).send({ message: 'Group with this login has already been' });
            }

            res.status(201).send({ message: 'Group was created', createdGroup });
        } catch (error) {
            throw error;
        }
    }
}

export const groupUserController = new GroupUserController();
