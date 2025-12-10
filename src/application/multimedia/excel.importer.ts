// import { Injectable } from '@nestjs/common';
// import { PrismaService } from 'src/database/prisma/prisma.service';
// import { FilaExcel } from './entities/fila-excel';
// import { EstadoDisponibilidad, TipoDeServicio } from '@prisma/client';

// @Injectable()
// export class ExcelImporter {
//   constructor(private readonly prisma: PrismaService) {}

//   async insertarDisponibilidades(filas: FilaExcel[]) {
//     let count = 0;

//     for (const fila of filas) {
//       console.log(fila);
//       // 1️⃣ Asegurar proveedor
//       const proveedor = await this.prisma.proveedor.upsert({
//         where: { nombre: fila.proveedor },
//         update: {},
//         create: {
//           nombre: fila.proveedor,
//           descripcion: 'Proveedor importado desde Excel',
//           tipo: fila.tipo_servicio as TipoDeServicio, // ej: TRANSPORTE, HOSPEDAJE
//         },
//       });

//       // 2️⃣ Asegurar servicio
//       const servicio = await this.prisma.servicio.upsert({
//         where: {
//           nombre_proveedor_id: {
//             nombre: fila.nombre_servicio,
//             proveedor_id: proveedor.id,
//           },
//         },
//         update: {},
//         create: {
//           nombre: fila.nombre_servicio,
//           tipo: fila.tipo_servicio.trim().toLowerCase() as TipoDeServicio,
//           proveedor_id: proveedor.id,
//           precio: fila.precio,
//         },
//       });

//       // 3️⃣ Crear disponibilidad
//       await this.prisma.disponibilidad.create({
//         data: {
//           servicioId: servicio.id,
//           fechaInicio: fila.fecha_inicio,
//           fechaFin: fila.fecha_fin,
//           precio: fila.precio,
//           cupo: Number(fila.cupo),
//           estado: fila.estado
//             .trim()
//             .toLowerCase()
//             .replace(' ', '_') as EstadoDisponibilidad,
//           detalles: fila.detalles,
//         },
//       });
//       count++;
//     }

//     return {
//       ok: true,
//       importados: count,
//     };
//   }
// }
