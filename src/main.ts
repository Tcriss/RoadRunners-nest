import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    logger: ['error', 'warn'],
  });

  app.useGlobalPipes( new ValidationPipe({
    transformOptions: {
      enableImplicitConversion: true
    }
  }))
  await app.listen(3000, '0.0.0.0');

  console.log(`Application running on port: ${await app.getUrl()}`);
}
bootstrap();