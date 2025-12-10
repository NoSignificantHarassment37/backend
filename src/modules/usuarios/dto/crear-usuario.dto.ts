import { IsEmail, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
// Es normal que @typescript/eslint arroje el error: Unsafe call of a(n) `error` type typed value.
export class CrearUsuarioDTO {
  @IsEmail()
  @ApiProperty()
  email!: string;
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{5,50}$/)
  @ApiProperty()
  contrasena!: string;
}
