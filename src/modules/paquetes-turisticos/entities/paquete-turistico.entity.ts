import { ApiProperty } from '@nestjs/swagger';
import {
  paquete_turistico,
  Estado,
  itinerario,
  servicio,
  reserva,
} from '@prisma/client';
export class PaqueteTuristicoEntity implements paquete_turistico {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  nombre!: string;

  @ApiProperty({ required: false, nullable: true })
  descripcion!: string | null;

  @ApiProperty({ type: 'number' })
  precio_total!: any;

  @ApiProperty()
  duracion_dias!: number;

  @ApiProperty()
  fecha_inicio!: Date;

  @ApiProperty()
  fecha_fin!: Date;

  @ApiProperty()
  creado_en!: Date;

  @ApiProperty({ enum: ['activo', 'inactivo'] })
  estado!: Estado;

  @ApiProperty({ required: false, nullable: true })
  Image!: LeerImagen | null;
  @ApiProperty()
  itinearios: itinerario[];
  @ApiProperty()
  servicios: servicio[];
  @ApiProperty()
  reservas: reserva[];
  @ApiProperty()
  cantidad_personas: number;
}
type LeerImagen = {
  url: string;
};
