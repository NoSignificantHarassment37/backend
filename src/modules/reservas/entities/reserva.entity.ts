import { ApiProperty } from '@nestjs/swagger';
import { reserva } from '@prisma/client';

export class ReservaEntity implements reserva {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  usuario_id!: number;

  @ApiProperty()
  paquete_id!: number;

  @ApiProperty()
  fecha_reserva!: Date;

  @ApiProperty()
  fecha_inicio!: Date;

  @ApiProperty()
  fecha_fin!: Date;

  @ApiProperty()
  estado!: string;

  @ApiProperty()
  numero_personas!: number;

  @ApiProperty({ type: 'number' })
  precio_total!: number;

  @ApiProperty({ required: false, nullable: true })
  metodo_pago!: string | null;

  @ApiProperty({ required: false, nullable: true })
  comentarios!: string | null;
}
