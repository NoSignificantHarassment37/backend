import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsDateString,
  IsInt,
  IsPositive,
} from 'class-validator';

export class CrearActividadDTO {
  @IsString()
  @ApiProperty()
  nombre!: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  descripcion?: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'Fecha y hora de inicio en formato ISO 8601',
  })
  hora_inicio?: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'Fecha y hora de fin en formato ISO 8601',
  })
  hora_fin?: string;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @IsOptional()
  @ApiProperty({ required: false })
  itinerario_id?: number;
}
