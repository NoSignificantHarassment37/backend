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
import { PaquetesTuristicosService } from './paquetes-turisticos.service';
import { PaqueteTuristicoEntity } from './entities/paquete-turistico.entity';
import { CrearPaqueteDTO } from './dto/crear-paquete.dto';
import { EditarPaqueteDTO } from './dto/editar-paquete.dto';
import { ModuloGuard } from 'src/application/authz/module.guard';
import { PermisoRequerido } from 'src/application/authz/modulo.decorator';
import { JwtAuthGuard } from 'src/application/auth/guards/jwt-auth.guard';
import { AcceptsJson } from 'src/application/validation/json-body.decorator';
import { JsonBodyGuard } from 'src/application/validation/validation.interceptor';

@Controller('paquetes-turisticos')
@ApiTags('paquetes-turisticos')
@UseGuards(JsonBodyGuard, JwtAuthGuard, ModuloGuard)
export class PaquetesTuristicosController {
  constructor(
    private readonly paquetesTuristicosService: PaquetesTuristicosService,
  ) {}

  @Post()
  @PermisoRequerido('paquetes_turisticos.create')
  @ApiCreatedResponse({ type: PaqueteTuristicoEntity })
  @AcceptsJson()
  create(@Body() crearPaqueteDto: CrearPaqueteDTO) {
    return this.paquetesTuristicosService.create(crearPaqueteDto);
  }

  @Get()
  @PermisoRequerido('paquetes_turisticos.findAll')
  @ApiOkResponse({ type: PaqueteTuristicoEntity, isArray: true })
  findAll() {
    return this.paquetesTuristicosService.findAll();
  }

  // @Get(':id')
  // @PermisoRequerido('paquetes_turisticos.findOne')
  // @ApiOkResponse({ type: PaqueteTuristicoEntity })
  // @ApiParam({ name: 'id', type: Number })
  // findOne(@Param('id', ParseIntPipe) id: number) {
  //   return this.paquetesTuristicosService.findOne(id);
  // }

  @Patch(':id')
  @PermisoRequerido('paquetes_turisticos.update')
  @ApiOkResponse({ type: PaqueteTuristicoEntity })
  @ApiParam({ name: 'id', type: Number })
  @AcceptsJson()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() editarPaqueteDto: EditarPaqueteDTO,
  ) {
    return this.paquetesTuristicosService.update(id, editarPaqueteDto);
  }

  @Delete(':id')
  @PermisoRequerido('paquetes_turisticos.remove')
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: PaqueteTuristicoEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.paquetesTuristicosService.remove(id);
  }

  @Get('public')
  @PermisoRequerido('none')
  async publicGetPaquetes() {
    return this.paquetesTuristicosService.getPublicPaquetes();
  }
}
