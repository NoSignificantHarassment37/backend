import { PartialType } from '@nestjs/swagger';
import { CrearItinerarioDTO } from './crear-itinerario.dto';

export class EditarItinerarioDTO extends PartialType(CrearItinerarioDTO) {}
