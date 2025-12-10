import { PartialType } from '@nestjs/swagger';
import { CrearUsuarioDTO } from './crear-usuario.dto';
export class EditarUsuarioDTO extends PartialType(CrearUsuarioDTO) {}
