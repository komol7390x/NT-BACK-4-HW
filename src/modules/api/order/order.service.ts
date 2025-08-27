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

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  // =========================== CREATE =========================== \\
  async create(createOrderDto: CreateOrderDto): Promise<IResponse> {
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
