import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schema/order.schema';
import { Customer, CustomerSchema } from 'src/modules/users/customer/schema/customer.schema';
import { Product, ProductSchema } from '../product/schema/product.schema';
import { ProductService } from '../product/product.service';
import { CustomerService } from 'src/modules/users/customer/customer.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Customer.name, schema: CustomerSchema },
      { name: Product.name, schema: ProductSchema },
    ])
  ],
  controllers: [OrderController],
  providers: [OrderService,ProductService,CustomerService],
})
export class OrderModule { }
