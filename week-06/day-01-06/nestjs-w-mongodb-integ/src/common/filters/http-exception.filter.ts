import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest();
    const status = exception.getStatus();
    const message = exception.message || 'An unexpected error occurred';

    Logger.error(
      `${status} - ${message}`,
      exception.stack,
      'HttpExceptionFilter',
    );

    response.status(status).json({
      statusCode: status,
      message: message,
      path: request.url,
    });
  }
}
