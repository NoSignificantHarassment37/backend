import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CrearActividadDTO } from './dto/crear-actividad.dto';
import { EditarActividadDTO } from './dto/editar-actividad.dto';
import { LocalCacheService } from 'src/application/cache/cache.service';

@Injectable()
export class ActividadesService {
  constructor(
    private prisma: PrismaService,
    private readonly cache: LocalCacheService,
  ) {}

  create(crearActividadDTO: CrearActividadDTO) {
    const data: any = {
      nombre: crearActividadDTO.nombre,
      descripcion: crearActividadDTO.descripcion,
      hora_inicio: crearActividadDTO.hora_inicio
        ? new Date(crearActividadDTO.hora_inicio)
        : null,
      hora_fin: crearActividadDTO.hora_fin
        ? new Date(crearActividadDTO.hora_fin)
        : null,
    };

    if (crearActividadDTO.itinerario_id) {
      data.itinerario = {
        connect: { id: crearActividadDTO.itinerario_id },
      };
    }

    const temp = this.prisma.actividad.create({ data });
    temp
      .then(() => {
        this.cache.delete('actividades_all');
      })
      .catch((err) => {
        console.error('Error reconstruyendo cache de actividades', err);
      });
    return temp;
  }

  findAll() {
    return this.prisma.actividad.findMany({
      select: {
        id: true,
        nombre: true,
        descripcion: true,
        hora_fin: true,
        hora_inicio: true,
        itinerario: {
          select: {
            id: true,
            nombre: true,
            dia: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.actividad.findUnique({
      where: { id },
      include: { itinerario: true },
    });
  }

  findByItinerario(itinerarioId: number) {
    return this.prisma.actividad.findMany({
      where: { itinerario_id: itinerarioId },
    });
  }

  update(id: number, editarActividadDTO: EditarActividadDTO) {
    const data: any = {};

    if (editarActividadDTO.nombre !== undefined) {
      data.nombre = editarActividadDTO.nombre;
    }
    if (editarActividadDTO.descripcion !== undefined) {
      data.descripcion = editarActividadDTO.descripcion;
    }
    if (editarActividadDTO.hora_inicio !== undefined) {
      data.hora_inicio = editarActividadDTO.hora_inicio
        ? new Date(editarActividadDTO.hora_inicio)
        : null;
    }
    if (editarActividadDTO.hora_fin !== undefined) {
      data.hora_fin = editarActividadDTO.hora_fin
        ? new Date(editarActividadDTO.hora_fin)
        : null;
    }
    if (editarActividadDTO.itinerario_id !== undefined) {
      data.itinerario_id = editarActividadDTO.itinerario_id;
    }

    const temp = this.prisma.actividad.update({
      where: { id },
      data,
    });
    temp
      .then(() => {
        this.cache.delete('actividades_all');
      })
      .catch((err) => {
        console.error('Error reconstruyendo cache de actividades', err);
      });
    return temp;
  }

  remove(id: number) {
    const temp = this.prisma.actividad.delete({ where: { id } });
    temp
      .then(() => {
        this.cache.delete('actividades_all');
      })
      .catch((err) => {
        console.error('Error reconstruyendo cache de actividades', err);
      });
    return temp;
  }

  async getPublicActividades() {
    return this.prisma.actividad.findMany({
      select: {
        id: true,
        nombre: true,
      },
    });
  }
}
