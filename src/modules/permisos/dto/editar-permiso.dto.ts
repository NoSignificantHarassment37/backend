import { PartialType } from '@nestjs/swagger';
import { CrearPermisoDTO } from './crear-permiso.dto';

export class EditarPermisoDTO extends PartialType(CrearPermisoDTO) {}
