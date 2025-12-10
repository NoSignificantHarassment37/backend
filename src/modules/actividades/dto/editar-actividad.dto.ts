import { PartialType } from '@nestjs/swagger';
import { CrearActividadDTO } from './crear-actividad.dto';

export class EditarActividadDTO extends PartialType(CrearActividadDTO) {}
