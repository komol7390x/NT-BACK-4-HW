import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'src/config/env.config';
import { HttpStatus, ValidationPipe } from '@nestjs/common';

export class Application {
  static async main(): Promise<void> {
    const app = await NestFactory.create(AppModule, {
      logger: false,
    });
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    );
    const PORT = config.API_PORT;    
    app.listen(PORT, () => console.log('Server is running:', PORT));
  }
}
