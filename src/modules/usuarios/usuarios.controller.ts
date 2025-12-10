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
import { UsuarioEntity } from './entities/usuario.entity';
import { CrearUsuarioDTO } from './dto/crear-usuario.dto';
import { EditarUsuarioDTO } from './dto/editar-usuario.dto';
import { UsuarioService } from './usuarios.service';
import { ModuloGuard } from 'src/application/authz/module.guard';
import { PermisoRequerido } from 'src/application/authz/modulo.decorator';
import { JwtAuthGuard } from 'src/application/auth/guards/jwt-auth.guard';
import { CacheResponse } from 'src/application/cache/cache-response.decorator';
import { CacheResponseInterceptor } from 'src/application/cache/cache-response.interceptor';
import { LocalCacheService } from 'src/application/cache/cache.service';
import { AcceptsJson } from 'src/application/validation/json-body.decorator';
import { JsonBodyGuard } from 'src/application/validation/validation.interceptor';

@Controller('usuarios')
@ApiTags('usuarios')
@UseGuards(JsonBodyGuard, JwtAuthGuard, ModuloGuard)
@UseInterceptors(CacheResponseInterceptor)
export class UsuariosController {
  constructor(
    private readonly usuariosService: UsuarioService,
    private readonly cache: LocalCacheService,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: UsuarioEntity })
  @PermisoRequerido('usuarios.create')
  @AcceptsJson()
  async create(@Body() crearUsuarioDto: CrearUsuarioDTO) {
    const temp = await this.usuariosService.create(crearUsuarioDto);
    this.cache.delete('usuarios_all');
    return temp;
  }

  @Get()
  @CacheResponse('usuarios_all')
  @ApiOkResponse({ type: UsuarioEntity, isArray: true })
  @PermisoRequerido('usuarios.findAll')
  findAll() {
    return this.usuariosService.findAll();
  }
  // @Get(':id')
  // @ApiOkResponse({ type: UsuarioEntity })
  // @PermisoRequerido('usuarios.findOne')
  // @ApiParam({ name: 'id', type: Number })
  // findOne(@Param('id', ParseIntPipe) id: number) {
  //   return this.usuariosService.findOne(id);
  // }

  @Patch(':id')
  @ApiOkResponse({ type: UsuarioEntity })
  @PermisoRequerido('usuarios.update')
  @ApiParam({ name: 'id', type: Number })
  @AcceptsJson()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() editarUsuarioDto: EditarUsuarioDTO,
  ) {
    return this.usuariosService.update(id, editarUsuarioDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  @PermisoRequerido('usuarios.remove')
  @ApiOkResponse({ type: UsuarioEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.remove(id);
  }
}
