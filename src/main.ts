import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const bootStrap = async () => {
  const server = await NestFactory.create(AppModule);
  const PORT = 3001;
  await server.listen(PORT, () => console.log('Server is running ', PORT));
};

bootStrap()