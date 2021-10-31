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

export type UpdateUserData = Omit<User, 'isDeleted'>
export type CreateUserData = Omit<UpdateUserData, 'id'>

export interface UserServiceInstance {
  getUser(_params:RequestParams): User | undefined;
  getUsersList(_params: RequestParams): User[] | undefined;
  createUser(_user: User):User | undefined;
  updateUser(_userId: string, _user: User):User | undefined;
  deleteUser(_userId: string): User | undefined;
}
