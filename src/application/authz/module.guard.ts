import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Reflector } from '@nestjs/core';
import { LocalCacheService } from '../cache/cache.service';

@Injectable()
export class ModuloGuard implements CanActivate {
  constructor(
    private readonly prisma: PrismaService,
    private readonly reflector: Reflector,
    private readonly cache: LocalCacheService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const usuario = req.usuario;

    const metadata = this.reflector.get<string>(
      'permiso',
      context.getHandler(),
    );
    if (!metadata || metadata === 'none') return true;

    let roles = this.cache.get('roles_all');

    if (!roles) {
      roles = await this.cache.cargarRoles();
    }

    return roles.some(
      (rol) =>
        rol.nombre === usuario.rol &&
        rol.permisos.some((p) => p.nombre === metadata),
    );
  }
}
