import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { validationConfig } from './common/config/validation.config';

import { AppModule } from './app.module';
import { appConfig } from './common/config/app.config';
import { corsConfig } from './common/config/cors.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, appConfig);

  app.useGlobalPipes(new ValidationPipe(validationConfig));
  app.enableCors(corsConfig);
  
  await app.listen(3001, '0.0.0.0');
  console.log(`Application running on port: ${await app.getUrl()}`);
}
bootstrap();