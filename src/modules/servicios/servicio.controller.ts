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
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import { ServicioEntity } from './entities/servicios.entity';
import { CrearServicioDTO } from './dto/create.dto.servicio';
import { EditarServicioDTO } from './dto/editar.dto.servicio';
import { ServicioService } from './servicio.service';
import { ModuloGuard } from 'src/application/authz/module.guard';
import { PermisoRequerido } from 'src/application/authz/modulo.decorator';
import { JwtAuthGuard } from 'src/application/auth/guards/jwt-auth.guard';
import { CacheResponseInterceptor } from 'src/application/cache/cache-response.interceptor';
import { CacheResponse } from 'src/application/cache/cache-response.decorator';
import { LocalCacheService } from 'src/application/cache/cache.service';
@Controller('servicios')
@ApiTags('servicios')
@UseGuards(JwtAuthGuard, ModuloGuard)
@UseInterceptors(CacheResponseInterceptor)
export class ServicioController {
  constructor(
    private readonly serviciosService: ServicioService,
    private readonly cache: LocalCacheService,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: ServicioEntity })
  @PermisoRequerido('servicios.create')
  async create(@Body() crearUsuarioDto: CrearServicioDTO) {
    const temp = await this.serviciosService.create(crearUsuarioDto);
    this.cache.delete('servicios_all');
    return temp;
  }

  @Get()
  @CacheResponse('servicios_all')
  @PermisoRequerido('servicios.findAll')
  @ApiOkResponse({ type: ServicioEntity, isArray: true })
  findAll() {
    return this.serviciosService.findAll();
  }
  // @Get(':id')
  // @UseGuards(JwtAuthGuard, ModuloGuard)
  // @ApiOkResponse({ type: ServicioEntity })
  // @ApiParam({ name: 'id', type: Number })
  // findOne(@Param('id', ParseIntPipe) id: number) {
  //   return this.serviciosService.findOne(id);
  // }

  @Patch(':id')
  @ApiOkResponse({ type: ServicioEntity })
  @PermisoRequerido('servicios.update')
  @ApiParam({ name: 'id', type: Number })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() editarUsuarioDto: EditarServicioDTO,
  ) {
    return this.serviciosService.update(id, editarUsuarioDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  @PermisoRequerido('servicios.remove')
  @ApiOkResponse({ type: ServicioEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.serviciosService.remove(id);
  }

  @Get('public')
  async publicGetServicios() {
    return this.serviciosService.getPublicServicios();
  }
}
