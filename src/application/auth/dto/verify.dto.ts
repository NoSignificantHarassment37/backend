import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsPositive, Max, Min } from 'class-validator';

export class VerifyDTO {
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsInt()
  @IsPositive()
  @Min(99999)
  @Max(999999)
  code: number;
}
