import { Module } from '@nestjs/common';
import { ServicioService } from './servicio.service';
import { ServicioController } from './servicio.controller';
import { PrismaModule } from '../../database/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ViajesNovaCacheModule } from 'src/application/cache/cache.module';

@Module({
  controllers: [ServicioController],
  providers: [ServicioService],
  imports: [PrismaModule, JwtModule, ViajesNovaCacheModule],
})
export class ServicioModule {}
