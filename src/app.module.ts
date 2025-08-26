import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminsModule } from './admins/admins.module';
import { AdminModel } from './admins/models/admin.model';
import { SallerModule } from './saller/saller.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { DatabaseCheckService } from './database/check-database';

@Module({
  providers:[DatabaseCheckService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      logging: false,
      synchronize: true,
      autoLoadModels: true,
      models: [AdminModel],
    }),
    AdminsModule,
    SallerModule,
    CategoryModule,
    ProductModule,
  ],
})
export class AppModule {}
