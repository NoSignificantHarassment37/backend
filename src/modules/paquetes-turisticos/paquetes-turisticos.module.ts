import { Module } from '@nestjs/common';
import { PaquetesTuristicosService } from './paquetes-turisticos.service';
import { PaquetesTuristicosController } from './paquetes-turisticos.controller';
import { PrismaModule } from '../../database/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ViajesNovaCacheModule } from 'src/application/cache/cache.module';
import { ValidationModule } from 'src/application/validation/validation.module';

@Module({
  controllers: [PaquetesTuristicosController],
  providers: [PaquetesTuristicosService],
  imports: [PrismaModule, JwtModule, ViajesNovaCacheModule, ValidationModule],
})
export class PaquetesTuristicosModule { }
