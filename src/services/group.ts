import { ModelCtor } from 'sequelize';
import {  GroupServiceInstance, GroupRequestParams, UserInstance, CreateGroupData, GroupInstance, Group, UpdateGroupData,  } from '../types';

export class GroupService implements GroupServiceInstance {
    public groupModel: ModelCtor<GroupInstance>;

    constructor(groupModel:ModelCtor<GroupInstance>) {
        this.groupModel = groupModel;
    }

    async getGroup({ groupId }: GroupRequestParams) {
        const foundGroup = await this.groupModel.findByPk(groupId, { raw:true });
        const castGroup = (foundGroup as unknown) as Group;

        return castGroup;
    }

    async getGroupList({}: GroupRequestParams) {
        try {
            const groups = await (await this.groupModel.findAll());

            return ((groups as unknown) as Group[])
        } catch (error) {
            console.error(error);

            return null;
        }
    }

    async createGroup(groupData: CreateGroupData) {
        try {
            const [newGroup, isCreated] = await this.groupModel.findOrCreate({ where: groupData, raw:true });

            if (!isCreated) {
                return null;
            }

            const castNewGroup = newGroup as unknown as Group;

            return castNewGroup;
        } catch (error) {
            console.error(error);

            return null;
        }
    }

    async updateGroup(passedGroup:UpdateGroupData) {
        try {
            const [result] = await this.groupModel.upsert(passedGroup, { returning: true });

            if (result) {
                const castNewGroup = result as unknown as Group;

                return castNewGroup;
            }

            return null;
        } catch (error) {
            console.error(error);

            return null;
        }
    }

    async removeGroup(groupId: string) {
        try {
            const result = await this.groupModel.destroy({ where: { id: groupId } });

            if (result > 0) {
                return 1;
            }

            return null;
        } catch (error) {
            console.error(error);

            return null;
        }
    }
}
