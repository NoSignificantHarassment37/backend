import { Module } from '@nestjs/common';
import { ItinerariosService } from './itinerarios.service';
import { ItinerariosController } from './itinerarios.controller';
import { PrismaModule } from '../../database/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ViajesNovaCacheModule } from 'src/application/cache/cache.module';
import { ValidationModule } from 'src/application/validation/validation.module';

@Module({
  controllers: [ItinerariosController],
  providers: [ItinerariosService],
  imports: [PrismaModule, JwtModule, ViajesNovaCacheModule, ValidationModule],
})
export class ItinerariosModule { }
