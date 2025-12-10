import { Module } from '@nestjs/common';
import { DisponibilidadController } from './disponibilidad.controller';
import { DisponibilidadService } from './disponibilidad.service';
import { PrismaModule } from '../../database/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ViajesNovaCacheModule } from 'src/application/cache/cache.module';
import { ValidationModule } from 'src/application/validation/validation.module';

@Module({
  controllers: [DisponibilidadController],
  providers: [DisponibilidadService],
  imports: [PrismaModule, JwtModule, ViajesNovaCacheModule, ValidationModule],
})
export class DisponibilidadModule {}
