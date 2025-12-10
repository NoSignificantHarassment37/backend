import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CrearDisponibilidadDTO } from './dto/crear-disponibilidad.dto';
import { EditarDisponibilidadDTO } from './dto/editar-disponibilidad.dto';
// ==========================
// SERVICE
// ==========================
@Injectable()
export class DisponibilidadService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CrearDisponibilidadDTO) {
    const temp = this.prisma.$transaction(async (tx) => {
      const disponibilidad = await tx.disponibilidad.create({
        data: {
          estado: dto.estado,
          fechaInicio: new Date(dto.fechaInicio),
          fechaFin: new Date(dto.fechaFin),
          servicioId: dto.servicioId,
          cupo: dto.cupo,
          precio: dto.precio,
          detalles: dto.detalles,
        },
      });
      return disponibilidad;
    });
    return temp;
  }

  findAll() {
    return this.prisma.disponibilidad.findMany({
      include: {
        servicio: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.disponibilidad.findUnique({
      where: { id },
      include: {
        servicio: true,
        disponibilidadPaquetes: true,
      },
    });
  }
  async findPublic() {
    return this.prisma.disponibilidad.findMany({
      select: {
        id: true,
        estado: true,
        fechaFin: true,
        fechaInicio: true,
        servicioId: true,
        cupo: true,
        precio: true,
        detalles: true,
        servicio: true,
      },
    });
  }
  async update(id: number, dto: EditarDisponibilidadDTO) {
    const temp = this.prisma.$transaction(async (tx) => {
      const disponibilidad = await tx.disponibilidad.update({
        where: { id },
        data: {
          ...(dto.estado !== undefined && { estado: dto.estado }),
          ...(dto.fechaInicio !== undefined && {
            fechaInicio: new Date(dto.fechaInicio),
          }),
          ...(dto.fechaFin !== undefined && {
            fechaFin: new Date(dto.fechaFin),
          }),
          ...(dto.servicioId !== undefined && { servicioId: dto.servicioId }),
          ...(dto.cupo !== undefined && { cupo: dto.cupo }),
          ...(dto.precio !== undefined && { precio: dto.precio }),
          ...(dto.detalles !== undefined && { detalles: dto.detalles }),
        },
      });
      return disponibilidad;
    });
    return temp;
  }

  async remove(id: number) {
    const temp = this.prisma.$transaction(async (tx) => {
      await tx.disponibilidad_paquete.deleteMany({
        where: { disponibilidad_id: id },
      });
      return await tx.disponibilidad.delete({ where: { id } });
    });
    return temp;
  }
}
