import { Module } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { ReservasController } from './reservas.controller';
import { PrismaModule } from '../../database/prisma/prisma.module';
import { CacheModule } from '@nestjs/cache-manager';
import { JwtModule } from '@nestjs/jwt';
import { ViajesNovaCacheModule } from 'src/application/cache/cache.module';
import { ValidationModule } from 'src/application/validation/validation.module';
import { ReservarController } from './reservar.controller';
import { ReservarService } from './reservar.service';

@Module({
  controllers: [ReservasController, ReservarController],
  providers: [ReservasService, ReservarService],
  imports: [
    PrismaModule,
    CacheModule.register({
      ttl: 5000,
    }),
    JwtModule,
    ViajesNovaCacheModule,
    ValidationModule,
  ],
})
export class ReservasModule {}
