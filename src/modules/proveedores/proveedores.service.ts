import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CrearProveedorDTO } from './dto/crear-proveedor.dto';
import { EditarProveedorDTO } from './dto/editar-proveedor.dto';
import { LocalCacheService } from 'src/application/cache/cache.service';

@Injectable()
export class ProveedoresService {
  constructor(
    private prisma: PrismaService,
    private readonly cache: LocalCacheService,
  ) {}

  create(crearProveedorDTO: CrearProveedorDTO) {
    const { telefono, ...rest } = crearProveedorDTO;
    const temp = this.prisma.proveedor.create({
      data: {
        ...rest,
        numero_de_telefono: telefono,
      },
    });
    temp
      .then(() => {
        this.cache.delete('proveedores_all');
      })
      .catch((err) => {
        console.error('Error reconstruyendo cache de proveedores', err);
      });
    return temp;
  }

  findAll() {
    return this.prisma.proveedor.findMany({
      include: {
        servicios: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.proveedor.findUnique({
      where: { id },
      include: {
        servicios: true,
      },
    });
  }

  update(id: number, editarProveedorDTO: EditarProveedorDTO) {
    const data: any = {};

    if (editarProveedorDTO.nombre !== undefined) {
      data.nombre = editarProveedorDTO.nombre;
    }
    if (editarProveedorDTO.descripcion !== undefined) {
      data.descripcion = editarProveedorDTO.descripcion;
    }
    if (editarProveedorDTO.tipo !== undefined) {
      data.tipo = editarProveedorDTO.tipo;
    }
    if (editarProveedorDTO.email !== undefined) {
      data.email = editarProveedorDTO.email;
    }
    if (editarProveedorDTO.telefono !== undefined) {
      data.numero_de_telefono = editarProveedorDTO.telefono;
    }

    const temp = this.prisma.proveedor.update({
      where: { id },
      data,
    });
    temp
      .then(() => {
        this.cache.delete('proveedores_all');
      })
      .catch((err) => {
        console.error('Error reconstruyendo cache de proveedores', err);
      });
    return temp;
  }

  remove(id: number) {
    const temp = this.prisma.proveedor.delete({ where: { id } });
    temp
      .then(() => {
        this.cache.delete('proveedores_all');
      })
      .catch((err) => {
        console.error('Error reconstruyendo cache de proveedores', err);
      });
    return temp;
  }

  async getPublicProveedores() {
    return this.prisma.proveedor.findMany({
      select: {
        id: true,
        nombre: true,
      },
    });
  }
}
