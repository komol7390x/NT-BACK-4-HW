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
import { CategoryService } from '../category/category.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    private readonly sallerService: SallerService,
    private readonly categoryService: CategoryService,
  ) {}

  // =========================== CREATE =========================== \\
  async create(createProductDto: CreateProductDto): Promise<IResponse> {
    const { saller_id, category_id } = createProductDto;

    await this.sallerService.findOne(saller_id);
    await this.categoryService.findOne(category_id);

    const result = await this.productModel.create(createProductDto);
    return getSuccess(result, 201);
  }

  // =========================== FIND ALL =========================== \\
  async findAll(): Promise<IResponse> {
    const result = await this.productModel
      .find()
      .find()
      .populate('saller_id')
      .populate('category_id')
      .exec();
    return getSuccess(result);
  }
  // =========================== FIND ONE =========================== \\
  async findOne(id: string): Promise<IResponse> {
    const result = await this.productModel
      .findById(id)
      .find()
      .populate('saller_id')
      .populate('category_id')
      .exec();
    if (!result) {
      throw new NotFoundException(`not found this ${id}`);
    }
    return getSuccess(result);
  }

  // =========================== UPDATE =========================== \\
  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<IResponse> {
    const { name, saller_id, category_id } = updateProductDto;
    if (saller_id) {
      const existSaller = await this.sallerService.findOne(saller_id);
      if (!existSaller) {
        throw new NotFoundException(`not found this ${saller_id} on Saller`);
      }
    }
    if (category_id) {
      const existCategory = await this.categoryService.findOne(category_id);
      if (!existCategory) {
        throw new NotFoundException(
          `not found this ${category_id} on Category`,
        );
      }
    }
    if (name) {
      const exist = await this.productModel.findOne({ name });
      if (exist && exist.id != id) {
        throw new ConflictException(`this ${name} already added`);
      }
    }
    const result = await this.productModel.findByIdAndUpdate(
      id,
      updateProductDto,
      {
        new: true,
      },
    );
    if (!result) {
      throw new NotFoundException(`not found this ${id}`);
    }
    return getSuccess(result);
  }
  // =========================== DELETE =========================== \\
  async remove(id: string): Promise<IResponse> {
    const result = await this.productModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`not found this ${id}`);
    }
    return getSuccess({});
  }
}
