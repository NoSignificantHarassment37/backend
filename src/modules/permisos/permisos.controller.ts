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
  ExecutionContext,
  BadRequestException,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import { PermisosService } from './permisos.service';
import { PermisoEntity } from './entities/permiso.entity';
import { CrearPermisoDTO } from './dto/crear-permiso.dto';
import { EditarPermisoDTO } from './dto/editar-permiso.dto';
import { PermisoRequerido } from 'src/application/authz/modulo.decorator';
import { ModuloGuard } from 'src/application/authz/module.guard';
import { JwtAuthGuard } from 'src/application/auth/guards/jwt-auth.guard';
import { CacheResponse } from 'src/application/cache/cache-response.decorator';
import { CacheResponseInterceptor } from 'src/application/cache/cache-response.interceptor';
import { LocalCacheService } from 'src/application/cache/cache.service';
import { AcceptsJson } from 'src/application/validation/json-body.decorator';
import { JsonBodyGuard } from 'src/application/validation/validation.interceptor';

@Controller('permisos')
@ApiTags('permisos')
@UseGuards(JsonBodyGuard, JwtAuthGuard, ModuloGuard)
@UseInterceptors(CacheResponseInterceptor)
export class PermisosController {
  constructor(
    private readonly permisosService: PermisosService,
    private readonly cache: LocalCacheService,
  ) { }

  @Post()
  @PermisoRequerido('permisos.create')
  @ApiCreatedResponse({ type: PermisoEntity })
  @AcceptsJson()
  create(@Body() crearPermisoDto: CrearPermisoDTO, @Req() req: Request) {
    const anyReq = req as any;
    if (Number.isFinite(Number(anyReq.id))) {
      console.log(anyReq.id);
      return new BadRequestException();
    }
    return this.permisosService.create(crearPermisoDto, anyReq.id);
  }

  @Get()
  @PermisoRequerido('permisos.findAll')
  @ApiOkResponse({ type: PermisoEntity, isArray: true })
  findAll() {
    return this.permisosService.findAll();
  }

  // @Get(':id')
  // @PermisoRequerido('permisos.findOne')
  // @ApiOkResponse({ type: PermisoEntity })
  // @ApiParam({ name: 'id', type: Number })
  // findOne(@Param('id', ParseIntPipe) id: number) {
  //   return this.permisosService.findOne(id);
  // }

  @Patch(':id')
  @PermisoRequerido('permisos.update')
  @ApiOkResponse({ type: PermisoEntity })
  @ApiParam({ name: 'id', type: Number })
  @AcceptsJson()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() editarPermisoDto: EditarPermisoDTO,
  ) {
    return this.permisosService.update(id, editarPermisoDto);
  }

  @Delete(':id')
  @PermisoRequerido('permisos.remove')
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: PermisoEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.permisosService.remove(id);
  }

  @Get('public')
  @PermisoRequerido('none')
  @CacheResponse('permisos_public_all')
  async publicGetPermisos() {
    return this.permisosService.getPublicPermisos();
  }
}
