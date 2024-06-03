import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      errorHttpStatusCode: 422,
      exceptionFactory: (errors) => {
        return new UnprocessableEntityException(
          errors.map((error) => ({
            property: error.property,
            constraints: error.constraints,
          })),
        );
      },
    }),
  );
  await app.listen(8000);
  console.log(`Server is listening to the port 8000`);
}
bootstrap();
