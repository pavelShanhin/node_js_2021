import * as Joi from 'joi';
import {
    ContainerTypes,
    ValidatedRequestSchema,
    createValidator
} from 'express-joi-validation';
import { CreateUserData, LoginDataType, UpdateUserData } from '../types';

const requestValidator = createValidator();

const loginUserSchema = {
    login: Joi.string().required(),
    password: Joi.string().alphanum().required()
};

const commonUserSchema = {
    ...loginUserSchema,
    age: Joi.number().greater(3).less(131).required()
};

const loginUserBodySchema = Joi.object(loginUserSchema);
const createUserBodySchema = Joi.object(commonUserSchema);
const updateUserBodySchema = Joi.object({ ...commonUserSchema, id: Joi.string().required() });

export interface CreateUserRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: CreateUserData
}

export interface UpdateUserRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: UpdateUserData,
}

export interface LoginUserRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: LoginDataType,
}

export const creationUserValidator = requestValidator.body(createUserBodySchema);
export const updatingUserBodyValidator = requestValidator.body(updateUserBodySchema);

export const loginValidation = requestValidator.body(loginUserBodySchema);
