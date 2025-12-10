import { Decimal } from '@prisma/client/runtime/library';
import { disponibilidad, EstadoDisponibilidad } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
export class DisponibilidadEntity implements disponibilidad {
  @ApiProperty()
  id: number;
  @ApiProperty()
  estado: EstadoDisponibilidad;
  @ApiProperty()
  fechaInicio: Date;
  @ApiProperty()
  fechaFin: Date;
  @ApiProperty()
  servicioId: number;
  @ApiProperty()
  cupo: number;
  @ApiProperty()
  precio: Decimal;
  @ApiProperty()
  detalles: string;
}
