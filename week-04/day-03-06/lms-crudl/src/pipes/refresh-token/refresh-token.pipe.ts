import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class RefreshTokenPipe implements PipeTransform {
  async transform(request: Request): Promise<void> {
    const refreshToken = request.cookies['refreshToken'];

    if (!refreshToken) {
      throw new BadRequestException('Refresh token is missing in cookies');
    }
    return refreshToken;
  }
}
