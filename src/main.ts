import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); 

  // swagger
  const config = new DocumentBuilder()
    .setTitle('API Baemin Documentation')
    .setDescription("The BAEMIN API project provides an online food delivery platform, allowing users to search for restaurants, place orders, and track their deliveries. The API efficiently manages users, restaurants, and orders, ensuring a seamless experience from selecting a meal to successful delivery.")
    .setVersion('1.0')
    .addTag('auth')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.use(express.json({ limit: '50mb' }));
  SwaggerModule.setup('api', app, document);

  await app.listen(8080);
}
bootstrap();