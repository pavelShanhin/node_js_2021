import { Model, Optional } from 'sequelize';

/* *User types*/
export type User = {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

export type UserUpdateParams =  {
  userId: string;
}

export interface UserRequestParams extends Partial<UserUpdateParams> {
  login?:string;
  limit?:number;
}

export type LoginDataType = Pick<User, 'login' | 'password'>;

export type UpdateUserData  = Optional<User, 'isDeleted'>
export type CreateUserData  = Omit<UpdateUserData, 'id'>
export type UserInstance = Model<User, CreateUserData>

export type AuthUserData = Omit<UpdateUserData, 'password'>;
export interface AuthUserDataWithToken  {
  user: AuthUserData,
  token: string
}

export interface UserServiceInstance {
  getUser(_params:UserRequestParams): Promise<User | null>;
  getUsersList(_params: UserRequestParams): Promise<User[] | null>;
  createUser(_user: CreateUserData):Promise<User | null>;
  updateUser(_user: User):Promise<User | null>;
  softUserDelete(_userId: string): Promise<number | null>;
}

/* *Group types*/
export enum Permissions {
  READ = 'READ',
  SHARE = 'SHARE',
  WRITE = 'WRITE',
  DELETE = 'DELETE',
  UPLOAD_FILES = 'UPLOAD_FILES'
}

export interface Group  {
  id: string;
  name: string;
  permissions: Permissions[];
}

export type GroupUpdateParams =  {
  groupId: string;
}

export interface GroupRequestParams extends Partial<GroupUpdateParams> {}

export type UpdateGroupData = Group;
export type CreateGroupData = Omit<Group, 'id'>
export type GroupInstance = Model<Group, CreateGroupData>

export interface GroupServiceInstance {
  getGroup(_params:GroupRequestParams): Promise<Group | null>;
  getGroupList(_params: GroupRequestParams): Promise<Group[] | null>;
  createGroup(_group: CreateGroupData):Promise<Group | null>;
  updateGroup(_group: Group):Promise<Group | null>;
  removeGroup(_groupId: string): Promise<number | null>;
}

/* *User's group types*/
export type UserGroup = {
  id: string;
  groups: string[];
}

export type CreateUserGroupRelation = {groupId: string, usersIds: string[]};
export type UserGroupInstance = Model<UserGroup, CreateUserGroupRelation>

export interface GroupUserServiceInstance {
  addUsersToGroup(_params:CreateUserGroupRelation): Promise<any | null>;
}
