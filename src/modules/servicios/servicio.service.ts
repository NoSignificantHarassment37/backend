import { EditarServicioDTO } from './dto/editar.dto.servicio';
import { CrearServicioDTO } from './dto/create.dto.servicio';
import { Injectable, UseInterceptors } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { CacheResponse } from 'src/application/cache/cache-response.decorator';
import { CacheResponseInterceptor } from 'src/application/cache/cache-response.interceptor';
import { LocalCacheService } from 'src/application/cache/cache.service';
@Injectable()
@UseInterceptors(CacheResponseInterceptor)
export class ServicioService {
  constructor(
    private prisma: PrismaService,
    private cache: LocalCacheService,
  ) {}
  async create(dto: CrearServicioDTO) {
    const { nombre, descripcion, tipo, precio, paquetes_ids } = dto;

    const temp = this.prisma.$transaction(async (tx) => {
      // 1) Crear servicio
      const servicio = await tx.servicio.create({
        data: { nombre, descripcion, tipo, precio },
      });

      // 2) Si no hay paquetes → ya terminaste
      if (paquetes_ids.length === 0) {
        return servicio;
      }

      // 3) Crear pivotes SIN verificar existencia
      //    Si algún paquete no existe, la DB lanzará error (violación FK)
      await tx.paquete_servicio.createMany({
        data: paquetes_ids.map((id) => ({
          servicio_id: servicio.id,
          paquete_id: id,
        })),
      });
      // 4) Retornar el servicio base (no expandido)
      return servicio;
    });

    temp
      .then(() => {
        this.cache.delete('servicios_all');
      })
      .catch((err) => {
        console.error('Error reconstruyendo cache de servicios', err);
      });

    return temp;
  }
  @CacheResponse('servicios_all')
  findAll() {
    return this.prisma.paquete_servicio.findMany({
      select: {
        paquete: true,
        servicio: true,
      },
    });
  }
  findOne(id: number) {
    return this.prisma.servicio.findUnique({ where: { id } });
  }
  async update(id: number, dto: EditarServicioDTO) {
    const { nombre, descripcion, precio, paquetes_ids, tipo } = dto;
    const temp = this.prisma.$transaction(async (tx) => {
      // 1) Actualizar servicio (solo los campos enviados)
      const servicioActualizado = await tx.servicio.update({
        where: { id: id },
        data: {
          ...(nombre !== undefined && { nombre }),
          ...(descripcion !== undefined && { descripcion }),
          ...(tipo !== undefined && { tipo }),
          ...(precio !== undefined && { precio }),
        },
      });

      // 2) Si no se enviaron paquetes, ya terminaste
      if (!paquetes_ids || paquetes_ids.length === 0) {
        return servicioActualizado;
      }

      // 3) Limpiar relaciones actuales
      await tx.paquete_servicio.deleteMany({
        where: { servicio_id: id },
      });

      // 4) Insertar las nuevas relaciones
      //    Sin verificar existencia manual: la DB valida por FK
      await tx.paquete_servicio.createMany({
        data: paquetes_ids.map((pid) => ({
          servicio_id: id,
          paquete_id: pid,
        })),
      });

      // 5) Retornar el servicio base (rápido)
      return servicioActualizado;
    });

    temp
      .then(() => {
        this.cache.delete('servicios_all');
      })
      .catch((err) => {
        console.error('Error reconstruyendo cache de servicios', err);
      });

    return temp;
  }

  async remove(id: number) {
    const temp = this.prisma.$transaction([
      this.prisma.paquete_servicio.deleteMany({ where: { servicio_id: id } }),
      this.prisma.servicio.delete({ where: { id } }),
    ]);

    temp
      .then(() => {
        this.cache.delete('servicios_all');
      })
      .catch((err) => {
        console.error('Error reconstruyendo cache de servicios', err);
      });

    return temp;
  }

  async getPublicServicios() {
    return this.prisma.servicio.findMany({
      select: {
        id: true,
        nombre: true,
      },
    });
  }
}
