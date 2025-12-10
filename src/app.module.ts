import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './database/prisma/prisma.module';
import { UsuarioModule } from './modules/usuarios/usuarios.module';
import { RolesModule } from './modules/roles/roles.module';
import { ReservasModule } from './modules/reservas/reservas.module';
import { ProveedoresModule } from './modules/proveedores/proveedores.module';
import { PaquetesTuristicosModule } from './modules/paquetes-turisticos/paquetes-turisticos.module';
import { PermisosModule } from './modules/permisos/permisos.module';
import { ActividadesModule } from './modules/actividades/actividades.module';
import { ItinerariosModule } from './modules/itinerarios/itinerarios.module';
import { AuthModule } from './application/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ServicioModule } from './modules/servicios/servicio.module';
import { MultimediaModule } from './application/multimedia/multimedia.module';
import { ViajesNovaCacheModule } from './application/cache/cache.module';
import { LocalCacheService } from './application/cache/cache.service';
import { PrismaService } from './database/prisma/prisma.service';
import { OnModuleInit } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { EmailModule } from './application/email/email.module';
import { DisponibilidadModule } from './modules/disponibilidad/disponibilidad.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // crítico
      envFilePath: '.env', // opcional, recomendado
    }),
    EmailModule,
    ViajesNovaCacheModule,
    AuthModule,
    ServicioModule,
    PrismaModule,
    UsuarioModule,
    RolesModule,
    ReservasModule,
    ProveedoresModule,
    PaquetesTuristicosModule,
    PermisosModule,
    DisponibilidadModule,
    ActividadesModule,
    ItinerariosModule,
    MultimediaModule,
    ThrottlerModule.forRoot({
      throttlers: [
        { ttl: 60000, limit: 100 }, // solo para desarrollo, 100 requests por 60_000 ms
      ],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: LocalCacheService,
  ) {}

  async onModuleInit() {
    /*
    // Cargar roles y permisos
    const roles = await this.prisma.rol.findMany({
      include: { permisos: true },
    });
    const usuarios = await this.prisma.usuario.findMany({
      select: { id: true, email: true, rol: true },
    });
    const publicPermisos = await this.prisma.permiso.findMany({
      select: {
        id: true,
        nombre: true,
      },
    });
    const permisos = await this.prisma.permiso.findMany();
    this.cache.set('roles_all', roles);
    this.cache.set('usuarios_all', usuarios);
    this.cache.set('permisos_all', permisos);
    this.cache.set('permisos_public_all', publicPermisos);
    console.log('Cache inicializada: roles, usuarios y permisos');
    */
  }
}
