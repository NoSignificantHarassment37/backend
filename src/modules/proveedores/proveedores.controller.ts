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
import { ProveedoresService } from './proveedores.service';
import { ProveedorEntity } from './entities/proveedor.entity';
import { CrearProveedorDTO } from './dto/crear-proveedor.dto';
import { EditarProveedorDTO } from './dto/editar-proveedor.dto';
import { ModuloGuard } from 'src/application/authz/module.guard';
import { PermisoRequerido } from 'src/application/authz/modulo.decorator';
import { JwtAuthGuard } from 'src/application/auth/guards/jwt-auth.guard';
import { AcceptsJson } from 'src/application/validation/json-body.decorator';
import { JsonBodyGuard } from 'src/application/validation/validation.interceptor';

@Controller('proveedores')
@ApiTags('proveedores')
@UseGuards(JsonBodyGuard, JwtAuthGuard, ModuloGuard)
export class ProveedoresController {
  constructor(private readonly proveedoresService: ProveedoresService) {}

  @Post()
  @PermisoRequerido('proveedores.create')
  @ApiCreatedResponse({ type: ProveedorEntity })
  @AcceptsJson()
  create(@Body() crearProveedorDto: CrearProveedorDTO) {
    return this.proveedoresService.create(crearProveedorDto);
  }

  @Get()
  @PermisoRequerido('proveedores.findAll')
  @ApiOkResponse({ type: ProveedorEntity, isArray: true })
  findAll() {
    return this.proveedoresService.findAll();
  }

  @Get(':id')
  @PermisoRequerido('proveedores.findOne')
  @ApiOkResponse({ type: ProveedorEntity })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.proveedoresService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ProveedorEntity })
  @PermisoRequerido('proveedores.update')
  @ApiParam({ name: 'id', type: Number })
  @AcceptsJson()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() editarProveedorDto: EditarProveedorDTO,
  ) {
    return this.proveedoresService.update(id, editarProveedorDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  @PermisoRequerido('proveedores.remove')
  @ApiOkResponse({ type: ProveedorEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.proveedoresService.remove(id);
  }
}
