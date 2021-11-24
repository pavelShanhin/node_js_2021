
import { ModelCtor, Transaction } from 'sequelize';
import {  GroupUserServiceInstance, CreateUserGroupRelation, GroupInstance  } from '../types';
import { sequelize } from '../models';

export class GroupUserService implements  GroupUserServiceInstance {
    public groupModel: ModelCtor<GroupInstance>;

    constructor(groupModel: ModelCtor<GroupInstance>) {
        this.groupModel = groupModel;
    }

    async addUsersToGroup({ groupId, usersIds }: CreateUserGroupRelation) {
        try {
            await sequelize.transaction(async (_t: Transaction) => {
                const foundGroup = await this.groupModel.findOne({
                    where: {
                        id: groupId
                    }
                }) as any;

                if (!foundGroup) {
                    throw new Error('Group not found');
                }

                for (const userId of usersIds) {
                    await foundGroup.addUser(userId, { through: { userId } });
                }
            });
        } catch (error) {
            throw error;
        }
    }
}
