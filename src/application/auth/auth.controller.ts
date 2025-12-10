import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { VerifyDTO } from './dto/verify.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('request')
  async request(@Body() dto: RegisterDTO) {
    const solucion = await this.authService.request(dto.email, dto.contrasena);
    if (solucion === null) {
      throw new ConflictException({
        seEnvio: false,
        razon: 'Ya se solicitó un código para ese correo.',
      });
    } else if (solucion) {
      return {
        seEnvio: true,
      };
    }
  }

  @Post('login')
  @ApiOkResponse({ type: LoginDTO })
  async login(@Body() dto: LoginDTO) {
    return this.authService.login(dto.email, dto.contrasena);
  }
  @Post('verify')
  @ApiCreatedResponse({})
  async verify(@Body() dto: VerifyDTO) {
    if (await this.authService.verify(dto.email, dto.code)) {
      return {
        verified: true,
      };
    };
  }
}
