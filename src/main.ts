import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import * as morgan from 'morgan';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { corsConfig } from './common/config/cors.config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    logger: ['error', 'warn'],
  });

  app.useGlobalPipes( new ValidationPipe({
    transformOptions: {
      enableImplicitConversion: true
    }
  }));
  app.enableCors(corsConfig);
  app.use(morgan('dev'));
  
  await app.listen(3001, '0.0.0.0');
  console.log(`Application running on port: ${await app.getUrl()}`);
}
bootstrap();