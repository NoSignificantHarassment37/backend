import { ApiProperty } from '@nestjs/swagger';
import { usuario } from '@prisma/client';

export class UsuarioEntity implements usuario {
  @ApiProperty()
  id!: number;
  @ApiProperty()
  email!: string;
  @ApiProperty()
  contrasena!: string;
  @ApiProperty({ required: false, nullable: true })
  rol_id!: number | null;
}
