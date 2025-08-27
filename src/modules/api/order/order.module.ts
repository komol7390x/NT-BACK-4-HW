import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schema/order.schema';
import { ProductModule } from '../product/product.module';
import { CustomerModule } from 'src/modules/users/customer/customer.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    ProductModule,
    CustomerModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
