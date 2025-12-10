import { ApiProperty } from '@nestjs/swagger';
import { proveedor, TipoDeServicio } from '@prisma/client';

export class ProveedorEntity implements proveedor {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  nombre!: string;

  @ApiProperty()
  descripcion!: string;

  @ApiProperty()
  tipo!: TipoDeServicio;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  numero_de_telefono!: string;
}
