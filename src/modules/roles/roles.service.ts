import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CrearRolDTO } from './dto/crear-rol.dto';
import { EditarRolDTO } from './dto/editar-rol.dto';
import { LocalCacheService } from 'src/application/cache/cache.service';

@Injectable()
export class RolesService {
  constructor(
    private prisma: PrismaService,
    private cache: LocalCacheService,
  ) {}

  async create(crearRolDTO: CrearRolDTO, usuario_id: number) {
    const user = await this.prisma.usuario.findUnique({
      where: { id: usuario_id },
    });
    console.log('Usuario existe?:', user);

    const data: any = {
      nombre: crearRolDTO.nombre,
      descripcion: crearRolDTO.descripcion,
      estado: crearRolDTO.estado,
      usuario_creador: { connect: { id: usuario_id } },
    };
    if (
      crearRolDTO.permisos_ids !== undefined &&
      crearRolDTO.permisos_ids.length > 0
    ) {
      data.permisos = {
        connect: crearRolDTO.permisos_ids.map((id) => ({ id })),
      };
    }
    const temp = this.prisma.rol.create({
      data,
      include: {
        permisos: true,
        usuario_creador: { select: { id: true, email: true } },
      },
    });
    temp
      .then(() => {
        this.cache.delete('roles_all');
        return this.cache.cargarRoles();
      })
      .catch((err) => {
        console.error('Error reconstruyendo cache de roles', err);
      });

    return temp;
  }

  findAll() {
    return this.prisma.rol.findMany({
      include: {
        usuario_creador: true,
        permisos: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.rol.findUnique({
      where: { id },
      include: {
        usuario_creador: true,
        permisos: true,
        usuario_asignado: true,
      },
    });
  }

  async update(id: number, editarRolDTO: EditarRolDTO) {
    const data: any = {};
    if (editarRolDTO.nombre !== undefined) {
      data.nombre = editarRolDTO.nombre;
    }
    if (editarRolDTO.descripcion !== undefined) {
      data.descripcion = editarRolDTO.descripcion;
    }
    if (editarRolDTO.estado !== undefined) {
      data.estado = editarRolDTO.estado;
    }
    if (
      editarRolDTO.permisos_ids !== undefined &&
      editarRolDTO.permisos_ids.length === 0
    ) {
      await this.prisma.rol.update({
        where: { id },
        data: {
          permisos: {
            set: [], // Esto “desconecta” todos los permisos del rol
          },
        },
      });
    }
    if (
      editarRolDTO.permisos_ids !== undefined &&
      editarRolDTO.permisos_ids.length > 0
    ) {
      data.permisos = {
        set: editarRolDTO.permisos_ids.map((id) => ({ id })),
      };
    }
    const temp = this.prisma.rol.update({
      where: { id },
      data,
    });

    temp
      .then(() => {
        this.cache.delete('roles_all');
        return this.cache.cargarRoles();
      })
      .catch((err) => {
        console.error('Error reconstruyendo cache de roles', err);
      });
    return temp;
  }

  async remove(id: number) {
    const temp = this.prisma.rol.delete({ where: { id } });

    temp
      .then(() => {
        this.cache.delete('roles_all');
        return this.cache.cargarRoles();
      })
      .catch((err) => {
        console.error('Error reconstruyendo cache de roles', err);
      });
    return temp;
  }
  async getpublicRoles() {
    return this.prisma.rol.findMany({
      select: {
        id: true,
        nombre: true,
      },
    });
  }
}
