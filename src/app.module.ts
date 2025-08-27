import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConnectDatabase } from './database/database';
import { AdminModule } from './modules/users/admin/admin.module';
import { SallerModule } from './modules/users/saller/saller.module';
import { CategoryModule } from './modules/api/category/category.module';
import { ProductModule } from './modules/api/product/product.module';
import { CustomerModule } from './modules/users/customer/customer.module';
import { OrderModule } from './modules/api/order/order.module';

@Module({
  providers: [ConnectDatabase],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(String(process.env.MONGO_DB)),
    AdminModule,
    SallerModule,
    CategoryModule,
    ProductModule,
    CustomerModule,
    OrderModule,
  ],
})
export class AppModule {}
