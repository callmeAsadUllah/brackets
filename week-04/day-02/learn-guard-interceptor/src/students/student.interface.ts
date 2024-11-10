import { IRole } from 'src/role/role.interface';

export interface IStudent {
  username: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  role: IRole;
}
