// cache-response.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const CACHE_KEY = 'cache_key';

export function CacheResponse(key: string) {
  return SetMetadata(CACHE_KEY, key);
}
