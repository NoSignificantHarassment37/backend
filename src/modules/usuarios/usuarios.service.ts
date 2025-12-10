import { CrearUsuarioDTO } from './dto/crear-usuario.dto';
import { EditarUsuarioDTO } from './dto/editar-usuario.dto';
import {
  Injectable,
  InternalServerErrorException,
  UseInterceptors,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { CacheResponse } from 'src/application/cache/cache-response.decorator';
import { CacheResponseInterceptor } from 'src/application/cache/cache-response.interceptor';
import { LocalCacheService } from 'src/application/cache/cache.service';
import { hash } from 'bcryptjs';
@Injectable()
@UseInterceptors(CacheResponseInterceptor)
export class UsuarioService {
  constructor(
    private prisma: PrismaService,
    private readonly cache: LocalCacheService,
  ) {}
  async create(crearUsuarioDTO: CrearUsuarioDTO) {
    const rol = await this.prisma.rol.findUnique({
      where: {
        nombre: 'Usuario',
      },
    });
    if (!rol) {
      return new InternalServerErrorException();
    }
    const hash = await bcrypt.hash(crearUsuarioDTO.contrasena, 10);
    const temp = this.prisma.usuario.create({
      data: {
        email: crearUsuarioDTO.email,
        rol: {
          connect: { id: rol.id },
        },
        contrasena: hash,
      },
    });
    temp
      .then(() => {
        this.cache.delete('usuarios_all');
      })
      .catch((err) => {
        console.error('Error reconstruyendo cache de usuarios', err);
      });
    return temp;
  }
  @CacheResponse('usuarios_all')
  findAll() {
    return this.prisma.usuario.findMany({
      select: {
        id: true,
        email: true,
        rol: true,
        roles_creados: true,
        permisos_creados: true,
        reservas: true,
      },
    });
  }
  /*
  findOne(id: number) {
    return this.prisma.usuario.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        rol: true,
        roles_creados: true,
        permisos_creados: true,
        reservas: true,
      },
    });
  }
*/
  async update(id: number, editarUsuarioDTO: EditarUsuarioDTO) {
    const data: any = {};

    if (editarUsuarioDTO.email !== undefined) {
      data.email = editarUsuarioDTO.email;
    }
    if (editarUsuarioDTO.contrasena !== undefined) {
      data.contrasena = await hash(editarUsuarioDTO.contrasena, 10);
    }

    const temp = this.prisma.usuario.update({
      where: { id },
      data,
    });
    temp
      .then(() => {
        this.cache.delete('usuarios_all');
      })
      .catch((err) => {
        console.error('Error reconstruyendo cache de usuarios', err);
      });
    return temp;
  }

  async remove(id: number) {
    const temp = this.prisma.usuario.delete({
      where: { id },
    });
    temp
      .then(() => {
        this.cache.delete('usuarios_all');
      })
      .catch((err) => {
        console.error('Error reconstruyendo cache de usuarios', err);
      });
    return temp;
  }
}
