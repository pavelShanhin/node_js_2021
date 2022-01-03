import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { GroupService } from '../../services';
import { Permissions } from '../../types';
import { API_METHODS } from './constants';
import { GroupController } from './group-controller';

const group = {
    name: 'Bears',
    permissions: [Permissions.READ, Permissions.SHARE]
};

const groupWithId =  { ...group, id: 3 };

const reqParams = {
    groupId: 3
};

const req = {
    method: API_METHODS.GET
};

const gettingGroupsErrorArgs = { code: StatusCodes.BAD_REQUEST, message: 'Groups have not been found', requestMethod: API_METHODS.GET };

describe('Group Controller', () => {
    const mockedRes = {
        status: jest.fn().mockImplementation(() => ({
            send: jest.fn()
        }))
    } as unknown as Response;

    const spiedResStatus = jest.spyOn(mockedRes, 'status');
    const mockGroupNextFunction = jest.fn();

    const groupServiceMock = {
        getGroup: jest.fn().mockResolvedValue(group),
        getGroupList: jest.fn().mockResolvedValue([]),
        removeGroup: jest.fn().mockResolvedValue(1),
        updateGroup: jest.fn().mockResolvedValue(groupWithId),
        createGroup: jest.fn().mockResolvedValue(group)
    } as unknown as GroupService;

    const groupController = new GroupController(groupServiceMock);
    const spyedGetGroups = jest.spyOn(groupController, 'getGroups');

    describe('GetGroups method', () => {
        const gettingGroupssRequest = req as unknown as Request;

        it(`Should be called with params and response with status ${StatusCodes.OK}`, async () => {
            await groupController.getGroups(gettingGroupssRequest, mockedRes, mockGroupNextFunction);

            expect(spyedGetGroups).toHaveBeenCalledWith(gettingGroupssRequest, mockedRes, mockGroupNextFunction);
            expect(spiedResStatus).toHaveBeenCalledWith(StatusCodes.OK);
        });

        it(`Should be called with bad params and then will be called callback function for handle error ${StatusCodes.BAD_REQUEST}`, async () => {
            groupServiceMock.getGroupList = jest.fn().mockResolvedValue(undefined);

            await groupController.getGroups(gettingGroupssRequest, mockedRes, mockGroupNextFunction);

            expect(mockGroupNextFunction).toHaveBeenCalledWith(gettingGroupsErrorArgs);
        });
    });

    const spyedGetGroup = jest.spyOn(groupController, 'getGroup');
    const gettingGroupErrorArgs = { code: StatusCodes.BAD_REQUEST, message: 'Group has not been found', requestData: 'params: groupId:3,', requestMethod: API_METHODS.GET };
    const gettingGroupRequest = { ...req, params: reqParams } as unknown as Request;

    describe('GetGroup method', () => {
        it(`Should be called with params and response with status ${StatusCodes.OK}`, async () => {
            await groupController.getGroup(gettingGroupRequest, mockedRes, mockGroupNextFunction);

            expect(spyedGetGroup).toHaveBeenCalledWith(gettingGroupRequest, mockedRes, mockGroupNextFunction);
            expect(spiedResStatus).toHaveBeenCalledWith(StatusCodes.OK);
        });

        it(`Should be called with bad params and then will be called callback function for handle error ${StatusCodes.BAD_REQUEST}`, async () => {
            groupServiceMock.getGroup = jest.fn().mockResolvedValue(null);

            await groupController.getGroup(gettingGroupRequest, mockedRes, mockGroupNextFunction);

            expect(mockGroupNextFunction).toHaveBeenCalledWith(gettingGroupErrorArgs);
        });
    });

    const spyedCreateGroup = jest.spyOn(groupController, 'createGroup');
    const creatingGroupErrorArgs = { code: StatusCodes.BAD_REQUEST, message: 'Group with this name has already been', requestData: 'body: name:Bears, permissions:READ,SHARE,', requestMethod: API_METHODS.POST };
    const createGroupRequest = { ...req, method: 'POST', body: group } as unknown as Request;

    describe('CreateGroup method', () => {
        it(`Should be called with params and response with status ${StatusCodes.CREATED}`, async () => {
            await groupController.createGroup(createGroupRequest, mockedRes, mockGroupNextFunction);

            expect(spyedCreateGroup).toHaveBeenCalledWith(createGroupRequest, mockedRes, mockGroupNextFunction);
            expect(spiedResStatus).toHaveBeenCalledWith(StatusCodes.CREATED);
        });

        it(`Should be called with bad params and then will be called callback function for handle error ${StatusCodes.BAD_REQUEST}`, async () => {
            groupServiceMock.createGroup = jest.fn().mockResolvedValue(null);

            await groupController.createGroup(createGroupRequest, mockedRes, mockGroupNextFunction);

            expect(mockGroupNextFunction).toHaveBeenCalledWith(creatingGroupErrorArgs);
        });
    });

    const spyedUpdateGroup = jest.spyOn(groupController, 'updateGroup');
    const updatingGroupErrorArgs = { code: StatusCodes.BAD_REQUEST, message: 'Group has been not found', requestData: 'body: name:Bears, permissions:READ,SHARE, id:3,', requestMethod: API_METHODS.PUT };
    const updatingGroupRequest = { ...req, method: 'PUT', body: groupWithId } as unknown as Request;

    describe('UpdateGroup method', () => {
        it(`Should be called with params and response with status ${StatusCodes.OK}`, async () => {
            await groupController.updateGroup(updatingGroupRequest, mockedRes, mockGroupNextFunction);

            expect(spyedUpdateGroup).toHaveBeenCalledWith(updatingGroupRequest, mockedRes, mockGroupNextFunction);
            expect(spiedResStatus).toHaveBeenCalledWith(StatusCodes.OK);
        });

        it(`Should be called with bad params and then will be called callback function for handle error ${StatusCodes.BAD_REQUEST}`, async () => {
            groupServiceMock.updateGroup = jest.fn().mockResolvedValue(null);

            await groupController.updateGroup(updatingGroupRequest, mockedRes, mockGroupNextFunction);

            expect(mockGroupNextFunction).toHaveBeenCalledWith(updatingGroupErrorArgs);
        });
    });

    const spyedDeleteGroup = jest.spyOn(groupController, 'deleteGroup');
    const deletingGroupErrorArgs = { code: StatusCodes.BAD_REQUEST, message: 'Group has not been found', requestData: 'params: groupId:3,', requestMethod: API_METHODS.DELETE };
    const deletingGroupRequest = { ...req, method: 'DELETE', params:  reqParams } as unknown as Request;

    describe('DeleteGroup method', () => {
        it(`Should be called with params and response with status ${StatusCodes.OK}`, async () => {
            await groupController.deleteGroup(deletingGroupRequest, mockedRes, mockGroupNextFunction);

            expect(spyedDeleteGroup).toHaveBeenCalledWith(deletingGroupRequest, mockedRes, mockGroupNextFunction);
            expect(spiedResStatus).toHaveBeenCalledWith(StatusCodes.OK);
        });

        it(`Should be called with bad params and then will be called callback function for handle error ${StatusCodes.BAD_REQUEST}`, async () => {
            groupServiceMock.removeGroup = jest.fn().mockResolvedValue(null);

            await groupController.deleteGroup(deletingGroupRequest, mockedRes, mockGroupNextFunction);

            expect(mockGroupNextFunction).toHaveBeenCalledWith(deletingGroupErrorArgs);
        });
    });
});
