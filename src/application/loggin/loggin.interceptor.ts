import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method: string = request.method;
    const url: string = request.originalUrl || request.url;
    const ip: string = request.ip;
    const body: string = request.body;
    const start = Date.now();

    console.log(
      `[Request] ${method} ${url} - from ${ip} - body - ${JSON.stringify(body)}`,
    );

    return next.handle().pipe(
      tap((data) => {
        const response = context.switchToHttp().getResponse();
        const status: number = response.statusCode;
        const duration = Date.now() - start;

        console.log(`[Response] ${method} ${url} - ${status} - ${duration}ms`);
      }),
    );
  }
}
