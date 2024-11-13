import { ObjectId } from 'mongoose';
import { IRole } from 'src/roles/role.interface';
import { RoleEnum } from 'src/roles/roles.enum';

export interface IUser {
  username: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  // refresh token
  refreshToken?: string;
  // relationship
  role: IRole;
  // relationship
  books?: ObjectId[];
}

export interface IResponse {
  message: string;
}

export interface IUserResponse {
  message: string;
  data: {
    username: string;
    firstName?: string;
    lastName?: string;
    email: string;
    role: {
      name: RoleEnum;
    };
  } | null;
}
export interface IUserRegisterResponse {
  message: string;
  data: Omit<IUser, 'password' | 'role'>;
}

export interface IUserLogInResponse {
  message: string;
  data: Omit<IUser, 'password' | 'refreshToken' | 'role' | 'books'>;
  accessToken: string;
  refreshToken: string;
}
