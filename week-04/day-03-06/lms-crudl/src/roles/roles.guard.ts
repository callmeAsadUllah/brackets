import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { RoleEnum } from './roles.enum';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new Error('Access denied. User not authenticated.');
    }

    if (user.role !== RoleEnum.ADMIN) {
      throw new Error('Access denied. Insufficient permissions.');
    }

    return true;
  }
}
