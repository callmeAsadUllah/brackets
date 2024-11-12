import { IBook } from '../books/book.interface';
import { IRole } from '../roles/role.interface';

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
  books?: IBook[];
}
