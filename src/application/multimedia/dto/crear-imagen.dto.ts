import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class CrearImageDTO {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  paquete_id!: number;
}
