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
import { RolesService } from './roles.service';
import { RolEntity } from './entities/roles.entity';
import { CrearRolDTO } from './dto/crear-rol.dto';
import { EditarRolDTO } from './dto/editar-rol.dto';
import { ModuloGuard } from 'src/application/authz/module.guard';
import { PermisoRequerido } from 'src/application/authz/modulo.decorator';
import { JwtAuthGuard } from 'src/application/auth/guards/jwt-auth.guard';
import { LocalCacheService } from 'src/application/cache/cache.service';
import { CACHE_KEYS } from './cache.keys';
import { CacheResponseInterceptor } from 'src/application/cache/cache-response.interceptor';
import { CacheResponse } from 'src/application/cache/cache-response.decorator';
import { AcceptsJson } from 'src/application/validation/json-body.decorator';
import { JsonBodyGuard } from 'src/application/validation/validation.interceptor';
import { Request } from '@nestjs/common';
@Controller('roles')
@ApiTags('roles')
@UseGuards(JsonBodyGuard, JwtAuthGuard, ModuloGuard)
@UseInterceptors(CacheResponseInterceptor)
export class RolesController {
  constructor(
    private readonly rolesService: RolesService,
    private readonly cache: LocalCacheService,
  ) {}
  @Post()
  @PermisoRequerido('roles.create')
  @ApiCreatedResponse({ type: RolEntity })
  @AcceptsJson()
  async create(@Body() crearRolDto: CrearRolDTO, @Request() req: any) {
    return await this.rolesService.create(crearRolDto, req.usuario.id);
  }

  @Get()
  @PermisoRequerido('roles.findAll')
  @CacheResponse(CACHE_KEYS.PRIVATE_LIST)
  @ApiOkResponse({ type: RolEntity, isArray: true })
  async findAll() {
    return await this.rolesService.findAll();
  }
  /*
  @Get(':id')
  @PermisoRequerido('roles.findOne')
  @ApiOkResponse({ type: RolEntity })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id', ParseIntPipe) id: number) {
    if (!/^\d+$/.test(String(id))) {
      // no es un número => no debería entrar aquí
      throw new NotFoundException();
    }
    return this.rolesService.findOne(id);
  }
*/
  @Patch(':id')
  @PermisoRequerido('roles.update')
  @ApiOkResponse({ type: RolEntity })
  @ApiParam({ name: 'id', type: Number })
  @AcceptsJson()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() editarRolDto: EditarRolDTO,
  ) {
    return await this.rolesService.update(id, editarRolDto);
  }

  @Delete(':id')
  @PermisoRequerido('roles.remove')
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: RolEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.rolesService.remove(id);
  }
  @Get('public')
  @CacheResponse(CACHE_KEYS.PUBLIC_LIST)
  @PermisoRequerido('none')
  async publicGetRoles() {
    return await this.rolesService.getpublicRoles();
  }
}
