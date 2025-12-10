import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CrearPermisoDTO } from './dto/crear-permiso.dto';
import { EditarPermisoDTO } from './dto/editar-permiso.dto';
import { LocalCacheService } from 'src/application/cache/cache.service';

@Injectable()
export class PermisosService {
  constructor(
    private prisma: PrismaService,
    private readonly cache: LocalCacheService,
  ) {}

  create(crearPermisoDTO: CrearPermisoDTO, id: number) {
    const temp = this.prisma.permiso.create({
      data: {
        nombre: crearPermisoDTO.nombre,
        descripcion: crearPermisoDTO.descripcion,
        estado: crearPermisoDTO.estado,
        usuario_creador_id: id,
      },
    });
    temp
      .then(() => {
        this.cache.delete('permisos_all');
      })
      .catch((err) => {
        console.error('Error reconstruyendo cache de permisos', err);
      });
    return temp;
  }

  findAll() {
    return this.prisma.permiso.findMany({
      include: {
        usuario_creador: true,
        roles: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.permiso.findUnique({
      where: { id },
      include: {
        usuario_creador: true,
        roles: true,
      },
    });
  }

  update(id: number, editarPermisoDTO: EditarPermisoDTO) {
    const data: any = {};

    if (editarPermisoDTO.nombre !== undefined) {
      data.nombre = editarPermisoDTO.nombre;
    }
    if (editarPermisoDTO.descripcion !== undefined) {
      data.descripcion = editarPermisoDTO.descripcion;
    }
    if (editarPermisoDTO.estado !== undefined) {
      data.estado = editarPermisoDTO.estado;
    }

    const temp = this.prisma.permiso.update({
      where: { id },
      data,
    });
    temp
      .then(() => {
        this.cache.delete('permisos_all');
      })
      .catch((err) => {
        console.error('Error reconstruyendo cache de permisos', err);
      });
    return temp;
  }

  remove(id: number) {
    const temp = this.prisma.permiso.delete({ where: { id } });
    temp
      .then(() => {
        this.cache.delete('permisos_all');
      })
      .catch((err) => {
        console.error('Error reconstruyendo cache de permisos', err);
      });
    return temp;
  }

  async getPublicPermisos() {
    return this.prisma.permiso.findMany({
      select: {
        id: true,
        nombre: true,
      },
    });
  }
}
