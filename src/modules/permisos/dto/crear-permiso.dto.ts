import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsEnum,
  IsInt,
  IsPositive,
  IsOptional,
} from 'class-validator';

enum Estado {
  activo = 'activo',
  inactivo = 'inactivo',
}

export class CrearPermisoDTO {
  @IsString()
  @ApiProperty()
  nombre!: string;

  @IsString()
  @ApiProperty()
  descripcion!: string;

  @IsString()
  @ApiProperty({ enum: Estado, default: 'activo' })
  estado!: Estado;
}
