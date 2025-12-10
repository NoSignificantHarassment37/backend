import { Module } from '@nestjs/common';
import { PermisosService } from './permisos.service';
import { PermisosController } from './permisos.controller';
import { PrismaModule } from '../../database/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ViajesNovaCacheModule } from 'src/application/cache/cache.module';
import { ValidationModule } from 'src/application/validation/validation.module';

@Module({
  controllers: [PermisosController],
  providers: [PermisosService],
  imports: [PrismaModule, JwtModule, ViajesNovaCacheModule, ValidationModule],
})
export class PermisosModule { }
