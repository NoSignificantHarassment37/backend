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
import { ActividadesService } from './actividades.service';
import { ActividadEntity } from './entities/actividad.entity';
import { CrearActividadDTO } from './dto/crear-actividad.dto';
import { EditarActividadDTO } from './dto/editar-actividad.dto';
import { ModuloGuard } from 'src/application/authz/module.guard';
import { PermisoRequerido } from 'src/application/authz/modulo.decorator';
import { JwtAuthGuard } from 'src/application/auth/guards/jwt-auth.guard';
import { AcceptsJson } from 'src/application/validation/json-body.decorator';
import { JsonBodyGuard } from 'src/application/validation/validation.interceptor';

@Controller('actividades')
@ApiTags('actividades')
@UseGuards(JsonBodyGuard, JwtAuthGuard, ModuloGuard)
export class ActividadesController {
  constructor(private readonly actividadesService: ActividadesService) { }

  @Post()
  @PermisoRequerido('actividades.create')
  @ApiCreatedResponse({ type: ActividadEntity })
  @AcceptsJson()
  create(@Body() crearActividadDto: CrearActividadDTO) {
    return this.actividadesService.create(crearActividadDto);
  }

  @Get()
  @PermisoRequerido('actividades.findAll')
  @ApiOkResponse({ type: ActividadEntity, isArray: true })
  findAll() {
    return this.actividadesService.findAll();
  }

  // @Get(':id')
  // @PermisoRequerido('actividades.findOne')
  // @ApiOkResponse({ type: ActividadEntity })
  // @ApiParam({ name: 'id', type: Number })
  // findOne(@Param('id', ParseIntPipe) id: number) {
  //   return this.actividadesService.findOne(id);
  // }

  @Patch(':id')
  @PermisoRequerido('actividades.update')
  @ApiOkResponse({ type: ActividadEntity })
  @ApiParam({ name: 'id', type: Number })
  @AcceptsJson()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() editarActividadDto: EditarActividadDTO,
  ) {
    return this.actividadesService.update(id, editarActividadDto);
  }

  @Delete(':id')
  @PermisoRequerido('actividades.remove')
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: ActividadEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.actividadesService.remove(id);
  }

  @Get('public')
  @PermisoRequerido('none')
  async publicGetActividades() {
    return this.actividadesService.getPublicActividades();
  }
}
