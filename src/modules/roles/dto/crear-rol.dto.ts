import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsPositive, IsArray } from 'class-validator';

export class CrearRolDTO {
  @IsString()
  @ApiProperty()
  nombre!: string;

  @IsString()
  @ApiProperty()
  descripcion!: string;

  @IsString()
  @ApiProperty({ default: 'activo' })
  estado!: string;
  @IsArray()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  permisos_ids?: number[];
}
