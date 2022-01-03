import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UserService } from '../../services';
import { API_METHODS } from './constants';
import { UserController } from './user-controller';

const user = {
    login: 'Nikolai',
    password: '259998v',
    age: 30
};

const userWithId =  { ...user, id: 3 };

const queryParams = {
    id: 3,
    login:'n',
    limit:2
};

const reqParams = {
    userId: 3
};

const req = {
    method: API_METHODS.GET
};

const gettingUsersErrorArgs = { code: StatusCodes.BAD_REQUEST, message: 'Users have been not found', requestData: 'query: id:3, login:n, limit:2,', requestMethod: API_METHODS.GET };

describe('User Controller', () => {
    const mockedRes = {
        status: jest.fn().mockImplementation(() => ({
            send: jest.fn()
        }))
    } as unknown as Response;

    const spiedResStatus = jest.spyOn(mockedRes, 'status');
    const mockNextFunction = jest.fn();

    const userServiceMock = {
        getUser: jest.fn().mockResolvedValue(user),
        getUsersList: jest.fn().mockResolvedValue([]),
        softUserDelete: jest.fn().mockResolvedValue(userWithId),
        updateUser: jest.fn().mockResolvedValue(userWithId),
        createUser: jest.fn().mockResolvedValue(user)
    } as unknown as UserService;

    const userController = new UserController(userServiceMock);
    const spyedGetUsers = jest.spyOn(userController, 'getUsers');

    describe('GetUsers method', () => {
        const gettingUsersRequest = { ...req, query: queryParams } as unknown as Request;

        it(`Should be called with params and response with status ${StatusCodes.OK}`, async () => {
            await userController.getUsers(gettingUsersRequest, mockedRes, mockNextFunction);

            expect(spyedGetUsers).toHaveBeenCalledWith(gettingUsersRequest, mockedRes, mockNextFunction);
            expect(spiedResStatus).toHaveBeenCalledWith(StatusCodes.OK);
        });

        it(`Should be called with bad params and then will be called callback function for handle error ${StatusCodes.BAD_REQUEST}`, async () => {
            userServiceMock.getUsersList = jest.fn().mockResolvedValue(undefined);

            await userController.getUsers(gettingUsersRequest, mockedRes, mockNextFunction);

            expect(mockNextFunction).toHaveBeenCalledTimes(1);
            expect(mockNextFunction).toHaveBeenCalledWith(gettingUsersErrorArgs);
        });
    });

    const spyedGetUser = jest.spyOn(userController, 'getUser');
    const gettingUserErrorArgs = { code: StatusCodes.BAD_REQUEST, message: 'User has been not found', requestData: 'params: userId:3,', requestMethod: API_METHODS.GET };
    const gettingUserRequest = { ...req, params: reqParams } as unknown as Request;

    describe('GetUser method', () => {
        it(`Should be called with params and response with status ${StatusCodes.OK}`, async () => {
            await userController.getUser(gettingUserRequest, mockedRes, mockNextFunction);

            expect(spyedGetUser).toHaveBeenCalledWith(gettingUserRequest, mockedRes, mockNextFunction);
            expect(spiedResStatus).toHaveBeenCalledWith(StatusCodes.OK);
        });

        it(`Should be called with bad params and then will be called callback function for handle error ${StatusCodes.BAD_REQUEST}`, async () => {
            userServiceMock.getUser = jest.fn().mockResolvedValue(null);

            await userController.getUser(gettingUserRequest, mockedRes, mockNextFunction);

            expect(mockNextFunction).toHaveBeenCalledTimes(2);
            expect(mockNextFunction).toHaveBeenCalledWith(gettingUserErrorArgs);
        });
    });

    const spyedCreateUser = jest.spyOn(userController, 'createUser');
    const creatingUserErrorArgs = { code: StatusCodes.BAD_REQUEST, message: 'User with this login has already been', requestData: 'body: login:Nikolai, password:259998v, age:30,', requestMethod: API_METHODS.POST };
    const createUserRequest = { ...req, method: 'POST', body: user } as unknown as Request;

    describe('CreateUser method', () => {
        it(`Should be called with params and response with status ${StatusCodes.CREATED}`, async () => {
            await userController.createUser(createUserRequest, mockedRes, mockNextFunction);

            expect(spyedCreateUser).toHaveBeenCalledWith(createUserRequest, mockedRes, mockNextFunction);
            expect(spiedResStatus).toHaveBeenCalledWith(StatusCodes.CREATED);
        });

        it(`Should be called with bad params and then will be called callback function for handle error ${StatusCodes.BAD_REQUEST}`, async () => {
            userServiceMock.createUser = jest.fn().mockResolvedValue(null);

            await userController.createUser(createUserRequest, mockedRes, mockNextFunction);

            expect(mockNextFunction).toHaveBeenCalledTimes(3);
            expect(mockNextFunction).toHaveBeenCalledWith(creatingUserErrorArgs);
        });
    });

    const spyedUpdateUser = jest.spyOn(userController, 'updateUser');
    const updatingUserErrorArgs = { code: StatusCodes.BAD_REQUEST, message: 'User has been not found', requestData: 'body: login:Nikolai, password:259998v, age:30, id:3,', requestMethod: API_METHODS.PUT };
    const updatingUserRequest = { ...req, method: 'PUT', body: userWithId } as unknown as Request;

    describe('UpdateUser method', () => {
        it(`Should be called with params and response with status ${StatusCodes.OK}`, async () => {
            await userController.updateUser(updatingUserRequest, mockedRes, mockNextFunction);

            expect(spyedUpdateUser).toHaveBeenCalledWith(updatingUserRequest, mockedRes, mockNextFunction);
            expect(spiedResStatus).toHaveBeenCalledWith(StatusCodes.OK);
        });

        it(`Should be called with bad params and then will be called callback function for handle error ${StatusCodes.BAD_REQUEST}`, async () => {
            userServiceMock.updateUser = jest.fn().mockResolvedValue(null);

            await userController.updateUser(updatingUserRequest, mockedRes, mockNextFunction);

            expect(mockNextFunction).toHaveBeenCalledTimes(4);
            expect(mockNextFunction).toHaveBeenCalledWith(updatingUserErrorArgs);
        });
    });

    const spyedDeleteUser = jest.spyOn(userController, 'deleteUser');
    const deletingUserErrorArgs = { code: StatusCodes.BAD_REQUEST, message: 'User has been not found', requestData: 'params: userId:3,', requestMethod: API_METHODS.DELETE };
    const deletingUserRequest = { ...req, method: 'DELETE', params:  reqParams } as unknown as Request;

    describe('DeleteUser method', () => {
        it(`Should be called with params and response with status ${StatusCodes.OK}`, async () => {
            await userController.deleteUser(deletingUserRequest, mockedRes, mockNextFunction);

            expect(spyedDeleteUser).toHaveBeenCalledWith(deletingUserRequest, mockedRes, mockNextFunction);
            expect(spiedResStatus).toHaveBeenCalledWith(StatusCodes.OK);
        });

        it(`Should be called with bad params and then will be called callback function for handle error ${StatusCodes.BAD_REQUEST}`, async () => {
            userServiceMock.softUserDelete = jest.fn().mockResolvedValue(null);

            await userController.deleteUser(deletingUserRequest, mockedRes, mockNextFunction);

            expect(mockNextFunction).toHaveBeenCalledTimes(5);
            expect(mockNextFunction).toHaveBeenCalledWith(deletingUserErrorArgs);
        });
    });
});
