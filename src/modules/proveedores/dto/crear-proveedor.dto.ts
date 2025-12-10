import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsString,
  IsPhoneNumber,
  Length,
} from 'class-validator';
import { TipoDeServicio } from '@prisma/client';
export class CrearProveedorDTO {
  @IsString()
  @ApiProperty()
  nombre!: string;

  @IsString()
  @ApiProperty()
  descripcion!: string;

  @IsEnum(TipoDeServicio)
  @ApiProperty({
    description: 'Tipo de proveedor, ej: transporte, alojamiento, alimentacion',
  })
  tipo!: TipoDeServicio;

  @IsEmail()
  @ApiProperty()
  email!: string;

  @IsString()
  @IsPhoneNumber('CO', { message: 'Número telefónico inválido' })
  @Length(7, 20)
  @ApiProperty()
  telefono!: string;
}
