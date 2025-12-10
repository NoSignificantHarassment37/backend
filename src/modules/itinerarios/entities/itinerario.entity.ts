import { ApiProperty } from '@nestjs/swagger';
import { itinerario } from '@prisma/client';

export class ItinerarioEntity implements itinerario {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  nombre!: string;

  @ApiProperty()
  dia!: number;

  @ApiProperty()
  descripcion!: string;

  @ApiProperty({ required: false, nullable: true })
  paquete_id!: number | null;
}
