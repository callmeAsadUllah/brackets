import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { TokenExpiredError } from 'jsonwebtoken';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class VerifyAdminGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const accessToken = request.cookies['accessToken'];

    if (!accessToken) {
      throw new ForbiddenException('Authorization token not provided');
    }

    try {
      const secretKey = await this.authService.getRefreshToken();
      const decoded = await this.jwtService.verifyAsync(accessToken, {
        secret: secretKey,
      });
      if (!decoded || decoded.role !== 'ADMIN') {
        throw new ForbiddenException('Access restricted to admins');
      }
      request.user = decoded;
      return true;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token has expired');
      }
      throw new ForbiddenException(
        'Access denied Only Admin can Perform this Action',
      );
    }
  }
}
