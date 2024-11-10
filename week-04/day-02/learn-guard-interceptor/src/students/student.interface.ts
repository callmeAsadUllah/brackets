import { IRole } from 'src/roles/role.interface';

export interface IStudent {
  username: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  role: IRole;
}
