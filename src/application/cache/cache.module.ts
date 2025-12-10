import { Global, Module } from '@nestjs/common';
import { LocalCacheService } from './cache.service';
import { CacheResponseInterceptor } from './cache-response.interceptor';
import { PrismaModule } from 'src/database/prisma/prisma.module';
@Global()
@Module({
  imports: [PrismaModule],
  providers: [LocalCacheService, CacheResponseInterceptor],
  exports: [LocalCacheService, CacheResponseInterceptor],
})
export class ViajesNovaCacheModule {}
