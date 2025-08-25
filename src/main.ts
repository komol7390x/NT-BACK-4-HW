import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const bootStrap = async () => {
  const server = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('User create')
    .setDescription('Users CRUD')
    .setVersion('1.0')
    .addTag('user')
    .build();

  const documentBuilder = () => SwaggerModule.createDocument(server, config);
  SwaggerModule.setup('api', server, documentBuilder);

  const PORT = 3001;
  await server.listen(PORT, () => console.log('Server is running ', PORT));
};
bootStrap();
