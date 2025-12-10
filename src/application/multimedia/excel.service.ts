// import { Injectable } from '@nestjs/common';
// import * as XLSX from 'xlsx';
// import { ExcelImporter } from './excel.importer';
// import { EstadoDisponibilidad, TipoDeServicio } from '@prisma/client';
// import { FilaExcel } from './entities/fila-excel';

// @Injectable()
// export class ExcelService {
//   constructor(private readonly importer: ExcelImporter) {}

//   async procesarExcelDisponibilidad(buffer: Buffer) {
//     const libro = XLSX.read(buffer);
//     const hoja = libro.Sheets['Disponibilidad'];
//     if (!hoja) throw new Error('La hoja "Disponibilidad" no existe');

//     const filas: FilaExcel[] = XLSX.utils.sheet_to_json(hoja);

//     const registrosNormalizados = filas.map((fila) => ({
//       proveedor: fila.proveedor.trim(),
//       tipo_servicio: fila.tipo_servicio.trim().toUpperCase() as TipoDeServicio,
//       nombre_servicio: fila.nombre_servicio.trim(),
//       fecha_inicio: new Date(fila.fecha_inicio),
//       fecha_fin: new Date(fila.fecha_fin),
//       precio: Number(fila.precio),
//       cupo: Number(fila.cupo),
//       estado: fila.estado.trim().toLowerCase() as EstadoDisponibilidad,
//       detalles: fila.detalles,
//     }));

//     return this.importer.insertarDisponibilidades(registrosNormalizados);
//   }
// }
