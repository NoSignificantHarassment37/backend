// import {
//   Controller,
//   Post,
//   UploadedFile,
//   UseInterceptors,
// } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { ExcelService } from './excel.service';
// import { Multer } from 'multer';
// @Controller('excel')
// export class ExcelController {
//   constructor(private readonly excelService: ExcelService) {}

//   @Post('disponibilidad')
//   @UseInterceptors(FileInterceptor('archivo'))
//   async importarDisponibilidad(@UploadedFile() archivo: Multer.File) {
//     if (!archivo) {
//       throw new Error('Debes subir un archivo Excel.');
//     }

//     return this.excelService.procesarExcelDisponibilidad(archivo.buffer);
//   }
// }
