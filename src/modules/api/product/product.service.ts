import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schema/product.schema';
import { Model } from 'mongoose';
import { getSuccess } from 'src/utils/success-res';
import { IResponse } from 'src/interface/success-res-interface';
import { SallerService } from 'src/modules/users/saller/saller.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly CategoryModel: Model<Product>,
    // private readonly Saller:SallerService
  ) {}

  // =========================== CREATE =========================== \\
  async create(createProductDto: CreateProductDto): Promise<IResponse> {
    const result = await this.CategoryModel.create(createProductDto);
    return getSuccess(result, 201);
  }

  // =========================== FIND ALL =========================== \\
  async findAll(): Promise<IResponse> {
    const result = await this.CategoryModel.find();
    return getSuccess(result);
  }
  // =========================== FIND ONE =========================== \\
  async findOne(id: string): Promise<IResponse> {
    const result = await this.CategoryModel.findById(id);
    if (!result) {
      throw new NotFoundException();
    }
    return getSuccess(result);
  }

  // =========================== UPDATE =========================== \\
  async update(id: string, updateProductDto: UpdateProductDto): Promise<IResponse> {
    const { name } = updateProductDto;
    if (name) {
      const exist = await this.CategoryModel.findOne({ name });
      if (exist && exist.id != id) {
      throw new ConflictException(`this ${name} already added`);
      }
    }
    const result = await this.CategoryModel.findByIdAndUpdate(id, updateProductDto, {
      new: true,
    });
    if (!result) {
      throw new NotFoundException();
    }
    return getSuccess(result);
  }
  // =========================== DELETE =========================== \\
  async remove(id: string): Promise<IResponse> {
    const result = await this.CategoryModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException();
    }
    return getSuccess({});
  }
}
