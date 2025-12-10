import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ModuloGuard } from '../authz/module.guard';
import { ViajesNovaCacheModule } from '../cache/cache.module';
import { EmailModule } from '../email/email.module';

@Module({
  controllers: [AuthController],
  providers: [ModuloGuard, AuthService],
  imports: [
    EmailModule,
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    ViajesNovaCacheModule,
  ],
  exports: [JwtModule, ModuloGuard, AuthService],
})
export class AuthModule {}
