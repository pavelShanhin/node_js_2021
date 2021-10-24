import * as Joi from 'joi';
import {
    ContainerTypes,
    ValidatedRequestSchema,
    createValidator
} from 'express-joi-validation';
import { CreateUserData, UpdateUserData } from '../index.types';

const commonSchema = {
    age: Joi.number().greater(3).less(131).required(),
    login: Joi.string().required(),
    password: Joi.string().alphanum().required()
};

const createBodySchema = Joi.object(commonSchema);
const updateBodySchema = Joi.object({ ...commonSchema, id: Joi.string().required() });

export interface CreateRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: CreateUserData
}

export interface UpdateRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: UpdateUserData
}

const requestValidator = createValidator();

export const creationValidator = requestValidator.body(createBodySchema);
export const updatingValidator = requestValidator.body(updateBodySchema);
