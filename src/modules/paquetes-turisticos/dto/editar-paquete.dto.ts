import { PartialType } from '@nestjs/swagger';
import { CrearPaqueteDTO } from './crear-paquete.dto';

export class EditarPaqueteDTO extends PartialType(CrearPaqueteDTO) {}
