import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
@Injectable()
export class ReservarService {
  constructor(private readonly prisma: PrismaService) {}
  async reservar(idPaquete: number, correoUsuario: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: {
        email: correoUsuario,
      },
      include: {
        rol: true,
      },
    });
    if (usuario === null) {
      throw new ConflictException('No existe una cuenta con ese correo.');
    }
    if (!(usuario.rol?.nombre === 'Usuario')) {
      throw new UnauthorizedException('Solo los usuarios pueden reservar.');
    }
    const paquete_turistico = await this.prisma.paquete_turistico.findUnique({
      where: {
        id: idPaquete,
      },
    });
    if (paquete_turistico === null) {
      throw new ConflictException('No existe ese paquete para reservar.');
    }
    const reserva = await this.prisma.reserva.create({
      data: {
        usuario: {
          connect: {
            id: usuario.id,
          },
        },
        paquete_turistico: {
          connect: {
            id: paquete_turistico.id,
          },
        },
        numero_personas: Number(paquete_turistico.cantidad_personas),
        estado: 'Pagada',
        fecha_reserva: new Date(),
      },
    });
    return Boolean(reserva);
  }
}
