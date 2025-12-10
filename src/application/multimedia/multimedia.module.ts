import { Module } from '@nestjs/common';
import { MultimediaController } from './multimedia.controller';
import { MultimediaService } from './images.service';
import { PrismaService } from '../../database/prisma/prisma.service';
import { SupabaseModule } from 'src/database/supabase/supabase.module';
import { SupabaseService } from 'src/database/supabase/supabase.service';
@Module({
  imports: [SupabaseModule],
  controllers: [MultimediaController],
  providers: [
    MultimediaService,
    PrismaService,
    SupabaseService,
    //ExcelService,
    //ExcelImporter,
  ],
})
export class MultimediaModule {}
