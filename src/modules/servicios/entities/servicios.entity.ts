import { Decimal } from '@prisma/client/runtime/library';
import { servicio, TipoDeServicio } from '@prisma/client';
import { IsInt, IsNumber, IsPositive, IsString, Length } from 'class-validator';
export class ServicioEntity implements servicio {
  @IsNumber()
  @IsPositive()
  id!: number;
  @IsString()
  @Length(5, 50)
  nombre!: string;
  @IsString()
  @Length(5, 50)
  descripcion!: string | null;
  @IsNumber()
  @IsPositive()
  precio!: Decimal;
  @IsString()
  @Length(5, 25)
  tipo!: TipoDeServicio;
  @IsInt()
  @IsPositive()
  proveedor_id!: number | null;
}
