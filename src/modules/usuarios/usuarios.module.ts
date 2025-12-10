import { Module } from '@nestjs/common';
import { UsuarioService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { PrismaModule } from '../../database/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ViajesNovaCacheModule } from 'src/application/cache/cache.module';
import { ValidationModule } from 'src/application/validation/validation.module';

@Module({
  controllers: [UsuariosController],
  providers: [UsuarioService],
  imports: [PrismaModule, JwtModule, ViajesNovaCacheModule, ValidationModule],
})
export class UsuarioModule { }
