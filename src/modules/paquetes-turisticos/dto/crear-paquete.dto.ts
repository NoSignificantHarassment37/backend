import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsInt,
  IsDateString,
  IsEnum,
  IsArray,
} from 'class-validator';

enum Estado {
  activo = 'activo',
  inactivo = 'inactivo',
}

export class CrearPaqueteDTO {
  @IsString()
  @ApiProperty()
  nombre!: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  descripcion?: string;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: 'number' })
  precio_total!: number;

  @IsInt()
  @Type(() => Number)
  @ApiProperty()
  duracion_dias!: number;

  @IsDateString()
  @ApiProperty({ description: 'Fecha de inicio en formato ISO 8601' })
  fecha_inicio!: string;

  @IsDateString()
  @ApiProperty({ description: 'Fecha de fin en formato ISO 8601' })
  fecha_fin!: string;

  @IsEnum(Estado)
  @ApiProperty({ enum: Estado })
  estado!: Estado;

  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number)
  @IsOptional()
  @ApiProperty({
    required: false,
    type: [Number],
    description: 'Array de IDs de servicios',
  })
  servicios_ids?: number[];

  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number)
  @IsOptional()
  @ApiProperty({
    required: false,
    type: [Number],
    description: 'Array de IDs de itinerarios',
  })
  itinerarios_ids?: number[];
  @ApiProperty({ required: false })
  @IsOptional()
  imagen_id?: string;
  @ApiProperty()
  @IsInt()
  cantidad_personas!: number;
}
