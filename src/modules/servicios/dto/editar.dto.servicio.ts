import { PartialType } from '@nestjs/swagger';
import { CrearServicioDTO } from './create.dto.servicio';
export class EditarServicioDTO extends PartialType(CrearServicioDTO) {}
