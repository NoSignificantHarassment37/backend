import { Image } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';
export class ImageEntity implements Image {
  @ApiProperty()
  @IsString()
  @Length(1, 255)
  id!: string;
  @ApiProperty()
  @IsString()
  @Length(1, 255)
  filename!: string;
  @ApiProperty()
  @IsUrl()
  @Length(1, 255)
  url!: string;
  @ApiProperty()
  @IsString()
  @Length(1, 100)
  mimetype!: string;
  @ApiProperty()
  @IsNumber()
  size!: number;
  @ApiProperty()
  @IsDate()
  createdAt!: Date;
  @ApiProperty()
  @IsDate()
  updatedAt!: Date;
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  paquete_id!: number | null;
}
