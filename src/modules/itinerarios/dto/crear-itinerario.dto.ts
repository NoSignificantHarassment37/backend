import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsInt,
  IsOptional,
  IsArray,
  IsPositive,
} from 'class-validator';

export class CrearItinerarioDTO {
  @IsInt()
  @Type(() => Number)
  @ApiProperty()
  dia!: number;

  @IsString()
  @ApiProperty()
  nombre!: string;

  @IsString()
  @ApiProperty()
  descripcion!: string;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @IsOptional()
  @ApiProperty({ required: false })
  paquete_id?: number;

  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number)
  @IsOptional()
  @ApiProperty({
    required: false,
    type: [Number],
    description: 'Array de IDs de actividades',
  })
  actividades_ids?: number[];
}
