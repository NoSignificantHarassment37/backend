import { Decimal } from '@prisma/client/runtime/library';
import { EstadoDisponibilidad } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';
import { Type } from 'class-transformer';
export class CrearDisponibilidadDTO {
  @IsEnum(EstadoDisponibilidad)
  @ApiProperty()
  estado: EstadoDisponibilidad;
  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  fechaInicio: Date;
  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  fechaFin: Date;
  @IsInt()
  @IsPositive()
  @ApiProperty()
  servicioId: number;
  @ApiProperty()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  cupo: number;
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  precio: Decimal;
  @ApiProperty()
  @IsString()
  @Length(5, 500)
  detalles: string;
}
