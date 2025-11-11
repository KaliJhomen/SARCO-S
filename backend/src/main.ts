import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser'; // ✅ Sin asterisco
import { HttpExceptionFilter } from './common/execeptions/http-exception.filter';
import * as dotenv from 'dotenv';

// ✅ Cargar .env explícitamente
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory, {
    swaggerOptions: {
      tagsSorter: 'alpha', // 👈 fuerza orden alfabético en el menú
      operationsSorter: 'alpha', // 👈 también ordena los endpoints dentro del tag
    },
  });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  app.use(cookieParser());

  app.enableCors({
    origin: [
      'http://localhost:3000',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Set-Cookie'],
  });
  const port = Number(process.env.PORT ?? 4000);
  const host = process.env.HOST || '0.0.0.0';
  await app.listen(port, host);
  // Log explícito de arranque
  console.log(`Nest app listening on http://${host === '0.0.0.0' ? 'localhost' : host}:${port}`);
}
bootstrap();
