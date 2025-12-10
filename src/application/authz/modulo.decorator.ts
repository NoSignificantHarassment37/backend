import { SetMetadata } from '@nestjs/common';

export const PermisoRequerido = (permiso: string) =>
  SetMetadata('permiso', permiso);
