import { Controller, Get, UseGuards } from '@nestjs/common';
import { ModuloGuard } from 'src/application/authz/module.guard';
import { PermisoRequerido } from 'src/application/authz/modulo.decorator';
import { JwtAuthGuard } from './application/auth/guards/jwt-auth.guard';
import { AppService } from './app.service';

@Controller()
@UseGuards(JwtAuthGuard, ModuloGuard)
@PermisoRequerido('none')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
