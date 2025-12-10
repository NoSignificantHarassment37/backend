import { PartialType } from '@nestjs/swagger';
import { CrearProveedorDTO } from './crear-proveedor.dto';

export class EditarProveedorDTO extends PartialType(CrearProveedorDTO) {}
