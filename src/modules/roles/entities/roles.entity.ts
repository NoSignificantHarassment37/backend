import { ApiProperty } from '@nestjs/swagger';
import { rol } from '@prisma/client';
export class RolEntity implements rol {
  @ApiProperty()
  id!: number;
  @ApiProperty()
  nombre!: string;
  @ApiProperty()
  fecha_registro!: Date;
  @ApiProperty()
  estado!: string;
  @ApiProperty()
  descripcion!: string;
  @ApiProperty({ required: false, nullable: true })
  usuario_creador_id!: number | null;
  @ApiProperty({ required: false, nullable: true })
  permisos_ids!: number[];
}
