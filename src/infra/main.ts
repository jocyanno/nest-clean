import { config } from 'dotenv';
import { resolve } from 'path';

// Carregar variáveis de ambiente primeiro
config({ path: resolve(process.cwd(), '.env') });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './env/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false,
  });

  app.enableCors();

  // Configurar middleware para parsear JSON usando a abordagem correta do NestJS
  app.use(require('express').json({ limit: '10mb' }));
  app.use(require('express').urlencoded({ extended: true }));

  const envService = app.get(EnvService);
  const port = envService.get('PORT');

  await app.listen(port);
}
bootstrap();
