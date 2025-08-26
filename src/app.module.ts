import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConnectDatabase } from './database/connect-database';
import { ProductModule } from './product/product.module';

@Module({
  providers: [ConnectDatabase],
  
  imports: [
    AdminModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      logging: false,
      autoLoadModels: true,
      synchronize: true,
      models: [],
    }),
    ProductModule,
  ],
})
export class AppModule {}
