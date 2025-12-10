import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CrearPaqueteDTO } from './dto/crear-paquete.dto';
import { EditarPaqueteDTO } from './dto/editar-paquete.dto';
import { LocalCacheService } from 'src/application/cache/cache.service';

@Injectable()
export class PaquetesTuristicosService {
  constructor(
    private prisma: PrismaService,
    private readonly cache: LocalCacheService,
  ) {}

  async create(crearPaqueteDTO: CrearPaqueteDTO) {
    const {
      nombre,
      descripcion,
      precio_total,
      duracion_dias,
      fecha_inicio,
      fecha_fin,
      estado,
      servicios_ids,
      itinerarios_ids,
      cantidad_personas,
    } = crearPaqueteDTO;

    const temp = this.prisma.$transaction(async (tx) => {
      // 1) Crear paquete turístico
      const paquete = await tx.paquete_turistico.create({
        data: {
          nombre,
          descripcion,
          precio_total,
          duracion_dias,
          fecha_inicio: new Date(fecha_inicio),
          fecha_fin: new Date(fecha_fin),
          estado,
          cantidad_personas,
        },
      });

      // 2) Conectar itinerarios si existen
      if (itinerarios_ids && itinerarios_ids.length > 0) {
        await tx.itinerario.updateMany({
          where: { id: { in: itinerarios_ids } },
          data: { paquete_id: paquete.id },
        });
      }

      // 3) Crear relaciones con servicios en la tabla intermedia
      if (servicios_ids && servicios_ids.length > 0) {
        await tx.paquete_servicio.createMany({
          data: servicios_ids.map((servicio_id) => ({
            paquete_id: paquete.id,
            servicio_id,
          })),
        });
      }

      return paquete;
    });

    temp
      .then(() => {
        this.cache.delete('paquetes_turisticos_all');
      })
      .catch((err) => {
        console.error('Error reconstruyendo cache de paquetes turísticos', err);
      });

    return temp;
  }

  findAll() {
    return this.prisma.paquete_turistico.findMany({
      select: {
        id: true,
        nombre: true,
        descripcion: true,
        duracion_dias: true,
        fecha_inicio: true,
        fecha_fin: true,
        creado_en: true,
        estado: true,
        precio_total: true,
        cantidad_personas: true,
        Image: {
          select: {
            url: true,
          },
        },
        servicios_disponibles: {
          include: {
            disponibilidad: {},
          },
        },
        itinerarios: {
          select: {
            id: true,
            nombre: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.paquete_turistico.findUnique({
      where: { id },
      include: {
        itinerarios: {
          include: {
            actividades: true,
          },
        },
        reservas: true,
      },
    });
  }

  async update(id: number, editarPaqueteDTO: EditarPaqueteDTO) {
    const {
      nombre,
      descripcion,
      precio_total,
      duracion_dias,
      fecha_inicio,
      fecha_fin,
      estado,
      servicios_ids,
      itinerarios_ids,
    } = editarPaqueteDTO;

    const temp = this.prisma.$transaction(async (tx) => {
      // 1) Actualizar paquete turístico (solo campos enviados)
      const paqueteActualizado = await tx.paquete_turistico.update({
        where: { id },
        data: {
          ...(nombre !== undefined && { nombre }),
          ...(descripcion !== undefined && { descripcion }),
          ...(precio_total !== undefined && { precio_total }),
          ...(duracion_dias !== undefined && { duracion_dias }),
          ...(fecha_inicio !== undefined && {
            fecha_inicio: new Date(fecha_inicio),
          }),
          ...(fecha_fin !== undefined && { fecha_fin: new Date(fecha_fin) }),
          ...(estado !== undefined && { estado }),
        },
      });

      // 2) Actualizar itinerarios si se enviaron
      if (itinerarios_ids !== undefined) {
        // Desconectar todos los itinerarios actuales
        await tx.itinerario.updateMany({
          where: { paquete_id: id },
          data: { paquete_id: null },
        });

        // Conectar los nuevos itinerarios
        if (itinerarios_ids.length > 0) {
          await tx.itinerario.updateMany({
            where: { id: { in: itinerarios_ids } },
            data: { paquete_id: id },
          });
        }
      }

      // 3) Actualizar servicios si se enviaron
      if (servicios_ids !== undefined) {
        // Limpiar relaciones actuales
        await tx.paquete_servicio.deleteMany({
          where: { paquete_id: id },
        });

        // Insertar nuevas relaciones
        if (servicios_ids.length > 0) {
          await tx.paquete_servicio.createMany({
            data: servicios_ids.map((servicio_id) => ({
              paquete_id: id,
              servicio_id,
            })),
          });
        }
      }

      return paqueteActualizado;
    });

    temp
      .then(() => {
        this.cache.delete('paquetes_turisticos_all');
      })
      .catch((err) => {
        console.error('Error reconstruyendo cache de paquetes turísticos', err);
      });

    return temp;
  }

  async remove(id: number) {
    const temp = this.prisma.$transaction(async (tx) => {
      // 1) Eliminar relaciones en paquete_servicio
      await tx.paquete_servicio.deleteMany({
        where: { paquete_id: id },
      });

      // 2) Desconectar itinerarios
      await tx.itinerario.updateMany({
        where: { paquete_id: id },
        data: { paquete_id: null },
      });

      // 3) Eliminar el paquete
      return await tx.paquete_turistico.delete({ where: { id } });
    });

    temp
      .then(() => {
        this.cache.delete('paquetes_turisticos_all');
      })
      .catch((err) => {
        console.error('Error reconstruyendo cache de paquetes turísticos', err);
      });

    return temp;
  }

  async getPublicPaquetes() {
    return this.prisma.paquete_turistico.findMany({
      select: {
        id: true,
        nombre: true,
        descripcion: true,
        fecha_inicio: true,
        fecha_fin: true,
        precio_total: true,
        duracion_dias: true,
        cantidad_personas: true,
        Image: {
          select: {
            url: true,
          },
        },
      },
    });
  }
}
