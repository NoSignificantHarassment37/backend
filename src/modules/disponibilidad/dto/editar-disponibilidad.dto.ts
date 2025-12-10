import { PartialType } from '@nestjs/swagger';
import { CrearDisponibilidadDTO } from './crear-disponibilidad.dto';
export class EditarDisponibilidadDTO extends PartialType(
  CrearDisponibilidadDTO,
) {}
