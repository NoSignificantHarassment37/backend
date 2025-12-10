import {
  IsArray,
  IsEnum,
  IsNumber,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';
import { TipoDeServicio } from '@prisma/client';
// Es normal que @typescript/eslint arroje el error: Unsafe call of a(n) `error` type typed value.
export class CrearServicioDTO {
  @ApiProperty()
  @IsString()
  @Length(5, 50)
  nombre!: string;
  @ApiProperty()
  @IsString()
  @Length(5, 200)
  descripcion!: string;
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  precio!: Decimal;
  @ApiProperty()
  @IsEnum(TipoDeServicio)
  tipo!: TipoDeServicio;
  @ApiProperty()
  @IsArray()
  @IsNumber({}, { each: true })
  @IsPositive({ each: true })
  paquetes_ids: number[];
}
