import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import {NestExpressApplication} from "@nestjs/platform-express";
import helmet from "helmet";

config({ path: '.env' });

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({ origin: '*',  credentials: true });
  app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
  app.disable('x-powered-by');

  await app.listen(process.env.PORT);
}

bootstrap();
