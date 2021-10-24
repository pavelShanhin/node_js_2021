export type User = {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

export type RequestParams = {
  userId?:string;
  login?:string;
  limit?:number;
}

export interface UserServiceInstance {
  getUser(_params:RequestParams): User | undefined;
  getUsersList(_params: RequestParams): User[] | undefined;
  createUser(_user: User):void;
  updateUser(_user: User):void;
  deleteUser(_userId: string):void;
}

export type CreateUserData = Omit<User, 'id' | 'isDeleted'>
