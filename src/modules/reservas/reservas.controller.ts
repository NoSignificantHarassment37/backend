import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import { ReservasService } from './reservas.service';
import { ReservaEntity } from './entities/reserva.entity';
import { CrearReservaDTO } from './dto/crear-reserva.dto';
import { EditarReservaDTO } from './dto/editar-reserva.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ModuloGuard } from 'src/application/authz/module.guard';
import { PermisoRequerido } from 'src/application/authz/modulo.decorator';
import { JwtAuthGuard } from 'src/application/auth/guards/jwt-auth.guard';
import { AcceptsJson } from 'src/application/validation/json-body.decorator';
import { JsonBodyGuard } from 'src/application/validation/validation.interceptor';

@Controller('reservas')
@ApiTags('reservas')
@UseGuards(JsonBodyGuard, JwtAuthGuard, ModuloGuard)
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) { }

  @Post()
  @ApiCreatedResponse({ type: ReservaEntity })
  @PermisoRequerido('reservas.create')
  @AcceptsJson()
  create(@Body() crearReservaDto: CrearReservaDTO) {
    return this.reservasService.create(crearReservaDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @PermisoRequerido('reservas.findAll')
  @ApiOkResponse({ type: ReservaEntity, isArray: true })
  findAll() {
    return this.reservasService.findAll();
  }

  // @Get(':id')
  // @ApiOkResponse({ type: ReservaEntity })
  // @PermisoRequerido('reservas.findOne')
  // @ApiParam({ name: 'id', type: Number })
  // findOne(@Param('id', ParseIntPipe) id: number) {
  //   return this.reservasService.findOne(id);
  // }

  @Patch(':id')
  @ApiOkResponse({ type: ReservaEntity })
  @ApiParam({ name: 'id', type: Number })
  @PermisoRequerido('reservas.update')
  @AcceptsJson()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() editarReservaDto: EditarReservaDTO,
  ) {
    return this.reservasService.update(id, editarReservaDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  @PermisoRequerido('reservas.remove')
  @ApiOkResponse({ type: ReservaEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.reservasService.remove(id);
  }
}
