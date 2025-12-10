import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Matches } from 'class-validator';
export class RegisterDTO {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{5,50}$/)
  contrasena: string;
}
