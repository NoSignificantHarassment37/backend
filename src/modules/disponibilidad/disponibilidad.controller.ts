import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import { CrearDisponibilidadDTO } from './dto/crear-disponibilidad.dto';
import { EditarDisponibilidadDTO } from './dto/editar-disponibilidad.dto';
import { DisponibilidadService } from './disponibilidad.service';
import { ModuloGuard } from 'src/application/authz/module.guard';
import { PermisoRequerido } from 'src/application/authz/modulo.decorator';
import { JwtAuthGuard } from 'src/application/auth/guards/jwt-auth.guard';
import { AcceptsJson } from 'src/application/validation/json-body.decorator';
import { JsonBodyGuard } from 'src/application/validation/validation.interceptor';
@Controller('disponibilidad')
@ApiTags('disponibilidad')
@UseGuards(JsonBodyGuard, JwtAuthGuard, ModuloGuard)
export class DisponibilidadController {
  constructor(private readonly disponibilidadService: DisponibilidadService) {}

  @Post()
  @PermisoRequerido('disponibilidad.create')
  @ApiCreatedResponse({ description: 'Disponibilidad creada' })
  @AcceptsJson()
  create(@Body() dto: CrearDisponibilidadDTO) {
    return this.disponibilidadService.create(dto);
  }

  @Get()
  @PermisoRequerido('disponibilidad.findAll')
  @ApiOkResponse({ description: 'Lista de disponibilidades' })
  findAll() {
    return this.disponibilidadService.findAll();
  }
  /*
  @Get(':id')
  @PermisoRequerido('disponibilidad.findOne')
  @ApiOkResponse({ description: 'Detalle de disponibilidad' })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.disponibilidadService.findOne(id);
  }
  */
  @Patch(':id')
  @PermisoRequerido('disponibilidad.update')
  @ApiOkResponse({ description: 'Disponibilidad actualizada' })
  @ApiParam({ name: 'id', type: Number })
  @AcceptsJson()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: EditarDisponibilidadDTO,
  ) {
    return this.disponibilidadService.update(id, dto);
  }

  @Delete(':id')
  @PermisoRequerido('disponibilidad.remove')
  @ApiOkResponse({ description: 'Disponibilidad eliminada' })
  @ApiParam({ name: 'id', type: Number })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.disponibilidadService.remove(id);
  }
  @Get('public')
  @PermisoRequerido('none')
  async getPublicDisponibilidad() {
    return await this.disponibilidadService.findPublic();
  }
}
