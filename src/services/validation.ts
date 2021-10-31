import * as Joi from 'joi';
import {
    ContainerTypes,
    ValidatedRequestSchema,
    createValidator
} from 'express-joi-validation';
import { CreateUserData, UpdateUserData, UpdateParams } from '../index.types';


const commonSchema = {
    age: Joi.number().greater(3).less(131).required(),
    login: Joi.string().required(),
    password: Joi.string().alphanum().required()
};

const createBodySchema = Joi.object(commonSchema);
const updateBodySchema = Joi.object({ ...commonSchema, id: Joi.string().required() });
const updateParamsSchema = Joi.object({ userId: Joi.string().required() });

export interface CreateRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: CreateUserData
}

export interface UpdateRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Params] : UpdateParams,
  [ContainerTypes.Body]: UpdateUserData,
}

const requestValidator = createValidator();

export const creationValidator = requestValidator.body(createBodySchema);
export const updatingBodyValidator = requestValidator.body(updateBodySchema);
export const updatingParamsValidator  = requestValidator.params(updateParamsSchema);
