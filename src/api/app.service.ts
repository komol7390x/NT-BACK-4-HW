import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'src/config/env.config';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionFilter } from 'src/infrastructure/exception/all-exception.filter';

export class Application {

  static async main(): Promise<void> {

    // CONNECT AppModule
    const app = await NestFactory.create(AppModule, {
      logger: false
    });

  
    // GLOBAL URL
    const api = 'api/v1'
    app.setGlobalPrefix(api);

    // GLOBAL ERROR HANDLE
    app.useGlobalFilters(new AllExceptionFilter())
    // VALIDATION
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),

    );

    // SWAGGER
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Nasiya APP')
      .setDescription('Nasiya APP uchun API hujjatlari')
      .setVersion('1.0.0')
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
        'JWT-auth',
      )
      .build();

    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup(api, app, swaggerDocument, {
      swaggerOptions: { persistAuthorization: true },
    });

    // PORT
    const PORT = config.API_PORT;
    app.listen(PORT, () => console.log('Server is running:', PORT));
  }
}