import { INestApplication, ValidationPipe } from '@nestjs/common';

/**
 * HTTP setup shared by `main.ts` and the e2e tests, so tests run against
 * exactly the same routes prefix and validation rules as the real server.
 */
export function configureApp(app: INestApplication): INestApplication {
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  return app;
}
