import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    next();
  }
}
