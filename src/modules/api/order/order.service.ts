import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schema/order.schema';
import { Model } from 'mongoose';
import { getSuccess } from 'src/utils/success-res';
import { IResponse } from 'src/interface/success-res-interface';
import { Product } from '../product/schema/product.schema';
import { ProductService } from '../product/product.service';
import { CustomerService } from 'src/modules/users/customer/customer.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
   private readonly productService:ProductService,
   private readonly customerService:CustomerService
  ) {}

  // =========================== CREATE =========================== \\
  async create(createOrderDto: CreateOrderDto): Promise<IResponse> {
    const {product_id,customer_id}=createOrderDto
    const existProduct=await this.productService.findOne(product_id)
    if(!existProduct){
      throw new NotFoundException(`not found this id=> ${product_id} on Product`)
    }

    const existCustomer=await this.customerService.findOne(customer_id)
    if(!existCustomer){
      throw new NotFoundException(`not found this id=> ${customer_id} on Customer`)
    }
    const result = await this.orderModel.create(createOrderDto);
    return getSuccess(result, 201);
  }

  // =========================== FIND ALL =========================== \\
  async findAll(): Promise<IResponse> {
    const result = await this.orderModel.find();
    return getSuccess(result);
  }
  // =========================== FIND ONE =========================== \\
  async findOne(id: string): Promise<IResponse> {
    const result = await this.orderModel.findById(id);
    if (!result) {
      throw new NotFoundException();
    }
    return getSuccess(result);
  }

  // =========================== UPDATE =========================== \\
  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<IResponse> {
    const {product_id,customer_id}=updateOrderDto
    if(product_id){
      const existProduct=await this.productService.findOne(product_id)
      if(!existProduct){
        throw new NotFoundException(`not found this id=> ${product_id} on Product`)
      }
    }
    if(customer_id){
      const existCustomer=await this.customerService.findOne(customer_id)
      if(!existCustomer){
        throw new NotFoundException(`not found this id=> ${customer_id} on Customer`)
      }
    }
    const result = await this.orderModel.findByIdAndUpdate(id, updateOrderDto, {
      new: true,
    });
    if (!result) {
      throw new NotFoundException();
    }
    return getSuccess(result);
  }
  // =========================== DELETE =========================== \\
  async remove(id: string): Promise<IResponse> {
    const result = await this.orderModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException();
    }
    return getSuccess({});
  }
}
