import { Types } from 'mongoose';
import { IRole } from 'src/roles/role.interface';

export interface IResponse {
  message: string;
}
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
  books?: Types.ObjectId[];
}

export interface IUserResponse {
  message: string;
  data:
    | (Omit<IUser, 'password' | 'refreshToken' | 'role'> & {
        books?: Types.ObjectId[];
      })
    | null;
}

export interface IUserRegisterResponse {
  message: string;
  data: Omit<IUser, 'password' | 'refreshToken' | 'role' | 'books'>;
}

export interface IUserLogInResponse {
  message: string;
  data: Omit<IUser, 'password' | 'refreshToken' | 'role' | 'books'>;
  accessToken: string;
  refreshToken: string;
}
