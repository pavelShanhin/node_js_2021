import {  ModelCtor } from 'sequelize';
import { GroupModel } from '../models';
import {  GroupUserServiceInstance, UserGroupInstance, CreateUserGroupRelation, UserInstance, GroupInstance  } from '../types';

export class GroupUserService implements  GroupUserServiceInstance {
    public groupUserModel: ModelCtor<UserGroupInstance>;
    public userModel: ModelCtor<UserInstance>;
    public groupModel: ModelCtor<GroupInstance>;

    constructor(groupUserModel:ModelCtor<UserGroupInstance>, userModel:ModelCtor<UserInstance>, groupModel: ModelCtor<GroupInstance>) {
        this.groupUserModel = groupUserModel;
        this.userModel = userModel;
        this.groupModel = groupModel;
    }

    async addUsersToGroup({ groupId, usersIds }: CreateUserGroupRelation) {
        if (usersIds.length === 0) {
            return null;
        }

        const foundUsers = await Promise.all(usersIds.map(async (userId) => await this.userModel.findOne({ where: { id: userId }, include: GroupModel, raw: true })));

        for (const user of foundUsers) {
            if (!user) {
                return;
            }

            const foundGroup = await this.groupModel.findOne({ where: { id: groupId }, raw: true });

            if (!foundGroup) {
                return;
            }
        }

        return null;
    }
}
