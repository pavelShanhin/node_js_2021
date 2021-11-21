import * as Joi from 'joi';
import {
    ContainerTypes,
    createValidator,
    ValidatedRequestSchema } from 'express-joi-validation';
import { CreateGroupData, Permissions, UpdateGroupData } from '../types';

const requestValidator = createValidator();

const commonGroupSchema = {
    name: Joi.string().required(),
    permissions: Joi.array().items(Joi.string().valid(Permissions.DELETE, Permissions.READ, Permissions.SHARE, Permissions.UPLOAD_FILES, Permissions.WRITE)).required()
};

const createGroupBodySchema = Joi.object(commonGroupSchema);
const updateGroupBodySchema = Joi.object({ ...commonGroupSchema, id: Joi.string().required() });

export interface CreateGroupRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: CreateGroupData
}

export interface UpdateGroupRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: UpdateGroupData,
}

export const creationGroupValidator = requestValidator.body(createGroupBodySchema);
export const updatingGroupBodyValidator = requestValidator.body(updateGroupBodySchema);
