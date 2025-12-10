import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { createClient } from '@supabase/supabase-js';
import { Multer } from 'multer';
import { SupabaseService } from 'src/database/supabase/supabase.service';
import { CrearImageDTO } from './dto/crear-imagen.dto';
@Injectable()
export class MultimediaService {
  constructor(
    private prisma: PrismaService,
    private supabase: SupabaseService,
  ) {}

  // subir binario a supabase
  async uploadToSupabase(file: Multer.File) {
    const ext = file.originalname.split('.').pop();
    const newName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const filePath = `images/${newName}`;

    const { data, error } = await this.supabase.client.storage
      .from('images')
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (error) {
      throw new BadRequestException(
        'Error al subir a Supabase: ' + error.message,
      );
    }

    const { data: urlData } = this.supabase.client.storage
      .from('images')
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  }

  async getAll() {
    return this.prisma.image.findMany();
  }

  async create(file: Multer.File, paquete_id: number) {
    if (!file) throw new BadRequestException('No se proporcionó archivo');

    const url = await this.uploadToSupabase(file);

    return this.prisma.image.create({
      data: {
        filename: file.originalname,
        url,
        mimetype: file.mimetype,
        size: file.size,
        paquete: {
          connect: { id: paquete_id },
        },
      },
    });
  }

  async update(id: string, dto: any) {
    return this.prisma.image.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: string) {
    const img = await this.prisma.image.findUnique({ where: { id } });
    if (!img) {
      throw new NotFoundException('Imagen no encontrada');
    }

    // eliminar el archivo real (si existe)
    if (img.url.includes('images/')) {
      const parts = img.url.split('/');
      const bucketPath = parts.slice(parts.length - 2).join('/');

      try {
        await this.supabase.client.storage.from('images').remove([bucketPath]);
      } catch (e) {
        console.error('Error eliminando binario en Supabase', e);
      }
    }

    await this.prisma.image.delete({ where: { id } });

    return { message: 'Imagen eliminada correctamente' };
  }
  async getPublicImages() {
    return this.prisma.image.findMany({
      select: {
        id: true,
        url: true,
      },
    });
  }
}
