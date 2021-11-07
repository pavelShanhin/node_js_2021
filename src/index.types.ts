import { Model, Optional } from 'sequelize';

export type User = {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

export type UpdateParams =  {
  userId: string;
}

export interface RequestParams extends Partial<UpdateParams> {
  login?:string;
  limit?:number;
}

export type UpdateUserData  = Optional<User, 'isDeleted'>
export type CreateUserData  = Omit<UpdateUserData, 'id'>

export type UserInstance = Model<User, CreateUserData>

export interface UserServiceInstance {
  getUser(_params:RequestParams): Promise<UserInstance | null>;
  getUsersList(_params: RequestParams): Promise<UserInstance[] | null>;
  createUser(_user: CreateUserData):Promise<UserInstance | null>;
  updateUser(_userId: string, _user: User):Promise<UserInstance | null>;
  softUserDelete(_userId: string): Promise<UserInstance | null>;
}
