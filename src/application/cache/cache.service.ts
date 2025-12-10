// cache.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class LocalCacheService {
  constructor(private readonly prisma: PrismaService) {}
  private cache: Map<string, any> = new Map();

  private cargandoRoles = false;
  private rolesPromise: Promise<any> | null = null;
  get(key: string): any | undefined {
    return this.cache.get(key);
  }

  set(key: string, value: any, ttlMs?: number): void {
    this.cache.set(key, value);

    if (ttlMs) {
      setTimeout(() => {
        this.cache.delete(key);
      }, ttlMs);
    }
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
  async cargarRoles() {
    if (this.cargandoRoles) return this.rolesPromise;
    this.cargandoRoles = true;
    this.rolesPromise = this.prisma.rol
      .findMany({
        include: { permisos: true },
      })
      .then((roles) => {
        this.cache.set('roles_all', roles);
        this.cargandoRoles = false;
        return roles;
      });
    return this.rolesPromise;
  }
  /*
  async cargarPermisos() {
    if (this.cargandoPermisos) return this.permisosPromise;
    this.cargandoRoles = true;
    this.rolesPromise = this.prisma.rol
      .findMany({
        include: { permisos: true },
      })
      .then((roles) => {
        this.cache.set('roles_all', roles);
        this.cargandoRoles = false;
        return roles;
      });
    return this.usuariosPromise;
  }
  async cargarUsuarios() {
    if (this.cargandoUsuarios) return this.usuariosPromise;
    this.cargandoRoles = true;
    this.rolesPromise = this.prisma.rol
      .findMany({
        include: { permisos: true },
      })
      .then((roles) => {
        this.cache.set('roles_all', roles);
        this.cargandoRoles = false;
        return roles;
      });
    return this.usuariosPromise;
  }
    */
}
