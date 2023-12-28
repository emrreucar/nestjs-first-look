import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
// import { CookieSession } from 'cookie-session'; // tsconfig ayarları yüzünden bunu import edemiyoruz.

const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      keys: ['asdfasfd'],
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // gelen isteklerin yabancı özelliklere sahip olmadığından emin olmaktır
    }),
  );
  await app.listen(3000);
}
bootstrap();
