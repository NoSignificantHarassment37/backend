import { prisma } from './database/prisma';
import { hash } from 'bcryptjs';

/**
 * Garantiza un estado válido del sistema.
 */
export async function garantizarEstadoValidoSistema() {
  process.once('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
  process.once('SIGTERM', async () => {
    await prisma.$disconnect();
    process.exit(0);
  });

  const rolesNecesarios = ['Usuario', 'Administrador'];
  const permisosAdministrador = [
    'permisos.findAll',
    'permisos.remove',
    'permisos.create',
    'permisos.update',
    'roles.findAll',
    'roles.remove',
    'roles.create',
    'roles.update',
    'paquetes-turisticos.findAll',
    'paquetes-turisticos.remove',
    'paquetes-turisticos.update',
    'paquetes-turisticos.create',
    'servicios.update',
    'servicios.create',
    'servicios.remove',
    'servicios.findAll',
    'usuarios.findAll',
    'usuarios.remove',
    'usuarios.create',
    'usuarios.update',
    'itinerarios.findAll',
    'itinerarios.create',
    'itinerarios.update',
    'itinerarios.remove',
    'actividades.findAll',
    'actividades.remove',
    'actividades.create',
    'actividades.update',
    'reservas.findAll',
    'reservas.create',
    'reservas.update',
    'reservas.remove',
    'proveedores.findAll',
    'proveedores.create',
    'proveedores.remove',
    'proveedores.update',
  ];

  await prisma.$transaction(
    async (tx) => {
      // 1️⃣ Crear roles si faltan
      for (const nombreRol of rolesNecesarios) {
        const rolExistente = await tx.rol.findUnique({
          where: { nombre: nombreRol },
        });
        if (!rolExistente) {
          await tx.rol.create({
            data: {
              nombre: nombreRol,
              estado: 'activo',
              fecha_registro: new Date(),
              descripcion: 'NN',
            },
          });
        }
      }

      // 2️⃣ Obtener rol Administrador actualizado
      const rolAdmin = await tx.rol.findUnique({
        where: { nombre: 'Administrador' },
      });
      if (!rolAdmin) throw new Error('No se pudo crear el rol Administrador');

      // 3️⃣ Crear permisos que falten y asociarlos a Administrador
      for (const nombrePermiso of permisosAdministrador) {
        // connectOrCreate es perfecto para este caso
        await tx.rol.update({
          where: { id: rolAdmin.id },
          data: {
            permisos: {
              connectOrCreate: {
                where: { nombre: nombrePermiso },
                create: {
                  nombre: nombrePermiso,
                  estado: 'activo',
                  fecha_registro: new Date(),
                  descripcion: 'NN',
                },
              },
            },
          },
        });
      }

      // 4️⃣ Crear usuario admin si no existe
      const adminUser = await tx.usuario.findFirst({
        where: { email: 'admin@gmail.com' },
      });
      if (!adminUser) {
        const hashedPassword = await hash('ViajesNova2025@', 10);
        await tx.usuario.create({
          data: {
            email: 'admin@gmail.com',
            contrasena: hashedPassword,
            rol: { connect: { id: rolAdmin.id } },
          },
        });
      }
    },
    {
      timeout: 60_000, // 1 minuto en milisegundos
      maxWait: 60_000, // opcional: cuánto esperar para obtener un slot
    },
  );
}
