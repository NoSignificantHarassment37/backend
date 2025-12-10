import { PartialType } from '@nestjs/swagger';
import { CrearRolDTO } from './crear-rol.dto';

export class EditarRolDTO extends PartialType(CrearRolDTO) {}
