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
import { ItinerariosService } from './itinerarios.service';
import { ItinerarioEntity } from './entities/itinerario.entity';
import { CrearItinerarioDTO } from './dto/crear-itinerario.dto';
import { EditarItinerarioDTO } from './dto/editar-itinerario.dto';
import { PermisoRequerido } from 'src/application/authz/modulo.decorator';
import { ModuloGuard } from 'src/application/authz/module.guard';
import { JwtAuthGuard } from 'src/application/auth/guards/jwt-auth.guard';
import { AcceptsJson } from 'src/application/validation/json-body.decorator';
import { JsonBodyGuard } from 'src/application/validation/validation.interceptor';

@Controller('itinerarios')
@ApiTags('itinerarios')
@UseGuards(JsonBodyGuard, JwtAuthGuard, ModuloGuard)
export class ItinerariosController {
  constructor(private readonly itinerariosService: ItinerariosService) { }

  @Post()
  @PermisoRequerido('itinerarios.create')
  @ApiCreatedResponse({ type: ItinerarioEntity })
  @AcceptsJson()
  create(@Body() crearItinerarioDto: CrearItinerarioDTO) {
    return this.itinerariosService.create(crearItinerarioDto);
  }

  @Get()
  @PermisoRequerido('itinerarios.findAll')
  @ApiOkResponse({ type: ItinerarioEntity, isArray: true })
  findAll() {
    return this.itinerariosService.findAll();
  }

  // @Get(':id')
  // @PermisoRequerido('itinerarios.findOne')
  // @ApiOkResponse({ type: ItinerarioEntity })
  // @ApiParam({ name: 'id', type: Number })
  // findOne(@Param('id', ParseIntPipe) id: number) {
  //   return this.itinerariosService.findOne(id);
  // }

  @Patch(':id')
  @PermisoRequerido('itinerarios.update')
  @ApiOkResponse({ type: ItinerarioEntity })
  @ApiParam({ name: 'id', type: Number })
  @AcceptsJson()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() editarItinerarioDto: EditarItinerarioDTO,
  ) {
    return this.itinerariosService.update(id, editarItinerarioDto);
  }

  @Delete(':id')
  @PermisoRequerido('itinerarios.remove')
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: ItinerarioEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.itinerariosService.remove(id);
  }

  @Get('public')
  @PermisoRequerido('none')
  async publicGetItinerarios() {
    return this.itinerariosService.getPublicItinerarios();
  }
}
