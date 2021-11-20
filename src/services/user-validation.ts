import * as Joi from 'joi';
import {
    ContainerTypes,
    ValidatedRequestSchema,
    createValidator
} from 'express-joi-validation';
import { CreateUserData, UpdateUserData } from '../types';

const requestValidator = createValidator();

const commonUserSchema = {
    age: Joi.number().greater(3).less(131).required(),
    login: Joi.string().required(),
    password: Joi.string().alphanum().required()
};

const createUserBodySchema = Joi.object(commonUserSchema);
const updateUserBodySchema = Joi.object({ ...commonUserSchema, id: Joi.string().required() });

export interface CreateUserRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: CreateUserData
}

export interface UpdateUserRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: UpdateUserData,
}

export const creationUserValidator = requestValidator.body(createUserBodySchema);
export const updatingUserBodyValidator = requestValidator.body(updateUserBodySchema);