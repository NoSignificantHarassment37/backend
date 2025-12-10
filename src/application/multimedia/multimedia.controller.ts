import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  Patch,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MultimediaService } from './images.service';
import { Multer } from 'multer';
import { ParseIntPipe } from '@nestjs/common';
@Controller('images')
export class MultimediaController {
  constructor(private service: MultimediaService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @UploadedFile() file: Multer.File,
    @Body('paquete_id', ParseIntPipe) paquete_id: number,
  ) {
    console.log(paquete_id);
    return this.service.create(file, paquete_id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
  @Get('public')
  getPublicImages() {
    return this.service.getPublicImages();
  }
}
