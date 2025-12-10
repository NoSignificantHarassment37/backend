import { PartialType } from '@nestjs/swagger';
import { CrearReservaDTO } from './crear-reserva.dto';

export class EditarReservaDTO extends PartialType(CrearReservaDTO) {}
