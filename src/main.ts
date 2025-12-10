import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { garantizarEstadoValidoSistema } from './validar-estado-sistema';
import { LoggingInterceptor } from './application/loggin/loggin.interceptor';
async function bootstrap() {
  //await garantizarEstadoValidoSistema();
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('ViajesNova')
    .setDescription('Descripcion de API de ViajesNova')
    .setVersion('alpha-26-11-2025')
    .addTag('usuario')
    .build();

  // CORRECCIÓN
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  await app.listen(Number(process.env.PORT ?? 3000));
}

bootstrap();
