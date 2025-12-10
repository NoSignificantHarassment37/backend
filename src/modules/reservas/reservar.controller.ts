import { Controller, Param, Post, Request, UseGuards } from '@nestjs/common';
import { PermisoRequerido } from 'src/application/authz/modulo.decorator';
import { JwtAuthGuard } from 'src/application/auth/guards/jwt-auth.guard';
import { ModuloGuard } from 'src/application/authz/module.guard';
import { ParseIntPipe } from '@nestjs/common';
import { ReservarService } from './reservar.service';
@Controller('reservar')
@UseGuards(JwtAuthGuard, ModuloGuard)
export class ReservarController {
  constructor(private readonly reservarService: ReservarService) {}
  @Post(':id')
  @PermisoRequerido('reservar')
  async reservarHandler(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any,
  ) {
    if (await this.reservarService.reservar(id, req.usuario.email)) {
      return;
    } else {
      throw new Error('no se pudo crear la reserva por un error desconocido.');
    }
  }
}
