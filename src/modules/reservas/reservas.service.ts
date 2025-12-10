import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CrearReservaDTO } from './dto/crear-reserva.dto';
import { EditarReservaDTO } from './dto/editar-reserva.dto';
import { LocalCacheService } from 'src/application/cache/cache.service';

@Injectable()
export class ReservasService {
  constructor(
    private prisma: PrismaService,
    private readonly cache: LocalCacheService,
  ) {}

  create(crearReservaDTO: CrearReservaDTO) {
    const temp = this.prisma.reserva.create({
      data: {
        usuario_id: crearReservaDTO.usuario_id,
        paquete_id: crearReservaDTO.paquete_id,
        estado: crearReservaDTO.estado,
        numero_personas: crearReservaDTO.numero_personas,
      },
    });
    temp
      .then(() => {
        this.cache.delete('reservas_all');
      })
      .catch((err) => {
        console.error('Error reconstruyendo cache de reservas', err);
      });
    return temp;
  }

  findAll() {
    return this.prisma.reserva.findMany({
      include: {
        usuario: true,
        paquete_turistico: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.reserva.findUnique({
      where: { id },
      include: {
        usuario: true,
        paquete_turistico: true,
      },
    });
  }

  update(id: number, editarReservaDTO: EditarReservaDTO) {
    const data: any = {};

    if (editarReservaDTO.usuario_id !== undefined) {
      data.usuario_id = editarReservaDTO.usuario_id;
    }
    if (editarReservaDTO.fecha_inicio !== undefined) {
      data.fecha_inicio = new Date(editarReservaDTO.fecha_inicio);
    }
    if (editarReservaDTO.fecha_fin !== undefined) {
      data.fecha_fin = new Date(editarReservaDTO.fecha_fin);
    }
    if (editarReservaDTO.estado !== undefined) {
      data.estado = editarReservaDTO.estado;
    }
    if (editarReservaDTO.numero_personas !== undefined) {
      data.numero_personas = editarReservaDTO.numero_personas;
    }
    if (editarReservaDTO.precio_total !== undefined) {
      data.precio_total = editarReservaDTO.precio_total;
    }
    if (editarReservaDTO.metodo_pago !== undefined) {
      data.metodo_pago = editarReservaDTO.metodo_pago;
    }
    if (editarReservaDTO.comentarios !== undefined) {
      data.comentarios = editarReservaDTO.comentarios;
    }

    const temp = this.prisma.reserva.update({
      where: { id },
      data,
    });
    temp
      .then(() => {
        this.cache.delete('reservas_all');
      })
      .catch((err) => {
        console.error('Error reconstruyendo cache de reservas', err);
      });
    return temp;
  }

  remove(id: number) {
    const temp = this.prisma.reserva.delete({ where: { id } });
    temp
      .then(() => {
        this.cache.delete('reservas_all');
      })
      .catch((err) => {
        console.error('Error reconstruyendo cache de reservas', err);
      });
    return temp;
  }
}
