// cache-response.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LocalCacheService } from './cache.service';
import { CACHE_KEY } from './cache-response.decorator';

@Injectable()
export class CacheResponseInterceptor implements NestInterceptor {
  constructor(
    private reflector: Reflector,
    private cache: LocalCacheService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const key = this.reflector.get<string>(CACHE_KEY, context.getHandler());
    if (!key) return next.handle();

    const cached = this.cache.get(key);
    if (cached) return of(cached);

    return next.handle().pipe(
      tap((response) => {
        this.cache.set(key, response);
      }),
    );
  }
}
