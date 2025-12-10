import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CrearItinerarioDTO } from './dto/crear-itinerario.dto';
import { EditarItinerarioDTO } from './dto/editar-itinerario.dto';
import { LocalCacheService } from 'src/application/cache/cache.service';

@Injectable()
export class ItinerariosService {
  constructor(
    private prisma: PrismaService,
    private readonly cache: LocalCacheService,
  ) {}

  create(crearItinerarioDTO: CrearItinerarioDTO) {
    const data: any = {
      dia: crearItinerarioDTO.dia,
      nombre: crearItinerarioDTO.nombre,
      descripcion: crearItinerarioDTO.descripcion,
    };

    if (crearItinerarioDTO.paquete_id) {
      data.paquete = {
        connect: { id: crearItinerarioDTO.paquete_id },
      };
    }

    if (
      crearItinerarioDTO.actividades_ids &&
      crearItinerarioDTO.actividades_ids.length > 0
    ) {
      data.actividades = {
        connect: crearItinerarioDTO.actividades_ids.map((id) => ({ id })),
      };
    }

    const temp = this.prisma.itinerario.create({ data });
    temp
      .then(() => {
        this.cache.delete('itinerarios_all');
      })
      .catch((err) => {
        console.error('Error reconstruyendo cache de itinerarios', err);
      });
    return temp;
  }

  findAll() {
    return this.prisma.itinerario.findMany({
      include: {
        paquete: true,
        actividades: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.itinerario.findUnique({
      where: { id },
      include: { paquete: true, actividades: true },
    });
  }

  update(id: number, editarItinerarioDTO: EditarItinerarioDTO) {
    const data: any = {};

    if (editarItinerarioDTO.dia !== undefined) {
      data.dia = editarItinerarioDTO.dia;
    }
    if (editarItinerarioDTO.nombre !== undefined) {
      data.nombre = editarItinerarioDTO.nombre;
    }
    if (editarItinerarioDTO.descripcion !== undefined) {
      data.descripcion = editarItinerarioDTO.descripcion;
    }
    if (editarItinerarioDTO.paquete_id !== undefined) {
      data.paquete = {
        connect: { id: editarItinerarioDTO.paquete_id },
      };
    }
    if (
      editarItinerarioDTO.actividades_ids &&
      editarItinerarioDTO.actividades_ids.length > 0
    ) {
      data.actividades = {
        set: editarItinerarioDTO.actividades_ids.map((id) => ({ id })),
      };
    }

    const temp = this.prisma.itinerario.update({
      where: { id },
      data,
    });
    temp
      .then(() => {
        this.cache.delete('itinerarios_all');
      })
      .catch((err) => {
        console.error('Error reconstruyendo cache de itinerarios', err);
      });
    return temp;
  }

  remove(id: number) {
    const temp = this.prisma.itinerario.delete({ where: { id } });
    temp
      .then(() => {
        this.cache.delete('itinerarios_all');
      })
      .catch((err) => {
        console.error('Error reconstruyendo cache de itinerarios', err);
      });
    return temp;
  }

  async getPublicItinerarios() {
    return this.prisma.itinerario.findMany({
      select: {
        id: true,
        nombre: true,
      },
    });
  }
}
