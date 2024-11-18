import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExecutionContext, CallHandler, NestInterceptor } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class VerifyAccessTokenInterceptor implements NestInterceptor {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>();
    const accessToken = request.cookies['accessToken'];
    if (!accessToken) {
      throw new UnauthorizedException('Access token missing');
    }

    try {
      const secretKey = await this.authService.getAccessToken();
      const decodedToken = this.jwtService.verify(accessToken, {
        secret: secretKey,
      });

      request.user = decodedToken;
    } catch {
      throw new UnauthorizedException('Unauthorized access token expired');
    }

    return next.handle();
  }
}
