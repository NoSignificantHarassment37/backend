import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsDateString,
  IsString,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class CrearReservaDTO {
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty()
  usuario_id!: number;

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty()
  paquete_id!: number;

  @IsDateString()
  @ApiProperty({ description: 'Fecha de inicio en formato ISO 8601' })
  fecha_inicio!: string;

  @IsDateString()
  @ApiProperty({ description: 'Fecha de fin en formato ISO 8601' })
  fecha_fin!: string;

  @IsString()
  @ApiProperty()
  estado!: string;

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty()
  numero_personas!: number;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: 'number' })
  precio_total!: number;

  @IsString()
  @ApiProperty()
  metodo_pago!: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  comentarios?: string;
}
