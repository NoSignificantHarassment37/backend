import { ApiProperty } from '@nestjs/swagger';
import { permiso } from '@prisma/client';

export class PermisoEntity implements permiso {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  nombre!: string;

  @ApiProperty()
  fecha_registro!: Date;

  @ApiProperty({ enum: ['activo', 'inactivo'] })
  estado!: any;

  @ApiProperty()
  descripcion!: string;

  @ApiProperty({ required: false, nullable: true })
  usuario_creador_id!: number | null;
}
