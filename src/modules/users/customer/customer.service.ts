import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from './schema/customer.schema';
import { Model } from 'mongoose';
import { getSuccess } from 'src/utils/success-res';
import { IResponse } from 'src/interface/success-res-interface';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private readonly customerModel: Model<Customer>,
  ) {}

  // =========================== CREATE =========================== \\
  async create(createAdminDto: CreateCustomerDto): Promise<IResponse> {
    const { email } = createAdminDto;
    const exist = await this.customerModel.findOne({ email });
    if (exist) {
      throw new ConflictException('Email already added');
    }
    const result = await this.customerModel.create(createAdminDto);

    return getSuccess(result, 201);
  }

  // =========================== FIND ALL =========================== \\
  async findAll(): Promise<IResponse> {
    const result = await this.customerModel.find();
    return getSuccess(result);
  }
  // =========================== FIND ONE =========================== \\
  async findOne(id: string): Promise<IResponse> {
    const result = await this.customerModel.findById(id);
    if (!result) {
      throw new NotFoundException(`not found this ${id}`);
    }
    return getSuccess(result);
  }

  // =========================== UPDATE =========================== \\
  async update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<IResponse> {
    const { email } = updateCustomerDto;
    if (email) {
      const exist = await this.customerModel.findOne({ email });
      if (exist && exist.id != id) {
        throw new ConflictException('Email already added');
      }
    }
    const result = await this.customerModel.findByIdAndUpdate(id, updateCustomerDto, {
      new: true,
    });
    if (!result) {
      throw new NotFoundException(`not found this ${id}`);
    }
    return getSuccess(result);
  }
  // =========================== DELETE =========================== \\
  async remove(id: string): Promise<IResponse> {
    const result = await this.customerModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`not found this ${id}`);
    }
    return getSuccess({});
  }
}
