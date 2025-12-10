import { ApiProperty } from '@nestjs/swagger';
import { actividad } from '@prisma/client';

export class ActividadEntity implements actividad {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  nombre!: string;

  @ApiProperty({ required: false, nullable: true })
  descripcion!: string | null;

  @ApiProperty({ required: false, nullable: true })
  hora_inicio!: Date | null;

  @ApiProperty({ required: false, nullable: true })
  hora_fin!: Date | null;

  @ApiProperty({ required: false, nullable: true })
  itinerario_id!: number | null;
}
