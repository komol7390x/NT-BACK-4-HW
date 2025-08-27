import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schema/order.schema';
import { CustomerService } from 'src/modules/users/customer/customer.service';

@Module({
  imports: [
      MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }],CustomerService)
    ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
