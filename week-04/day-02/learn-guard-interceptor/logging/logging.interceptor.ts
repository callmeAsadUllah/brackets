import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest();
    const url = request.url;
    const method = request.method;

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - now;
        this.logger.log(`Request to ${method} ${url} took ${duration}ms`);
      }),
    );
  }
}
