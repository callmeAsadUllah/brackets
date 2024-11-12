import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from './roles.enum';
import { ROLES_KEY } from './role.metadata';

export const Roles = (...roles: RoleEnum[]) => SetMetadata(ROLES_KEY, roles);
