import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, NextFunction, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  async use(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    console.log(
      `\tRequest Method: ${request.method}\n\tRequest Path: ${request.url}`,
    );
    next();
  }
}
