import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schema/category.schema';
import { Model } from 'mongoose';
import { getSuccess } from 'src/utils/success-res';
import { IResponse } from 'src/interface/success-res-interface';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly CategoryModel: Model<Category>,
  ) {}

  // =========================== CREATE =========================== \\
  async create(createCategoryDto: CreateCategoryDto): Promise<IResponse> {
    const { name } = createCategoryDto;
    const exist = await this.CategoryModel.findOne({ name });
    if (exist) {
      throw new ConflictException(`this ${name} already added`);
    }
    const result = await this.CategoryModel.create(createCategoryDto);

    return getSuccess(result, 201);
  }

  // =========================== FIND ALL =========================== \\
  async findAll(): Promise<IResponse> {
    const result = await this.CategoryModel.find().populate('products');
    return getSuccess(result);
  }
  // =========================== FIND ONE =========================== \\
  async findOne(id: string): Promise<IResponse> {
    const result = await this.CategoryModel.findById(id);
    if (!result) {
      throw new NotFoundException(`not found this ${id}`);
    }
    return getSuccess(result);
  }

  // =========================== UPDATE =========================== \\
  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<IResponse> {
    const { name } = updateCategoryDto;
    if (name) {
      const exist = await this.CategoryModel.findOne({ name });
      if (exist && exist.id != id) {
        throw new ConflictException(`this ${name} already added`);
      }
    }
    const result = await this.CategoryModel.findByIdAndUpdate(
      id,
      updateCategoryDto,
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
    const result = await this.CategoryModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`not found this ${id}`);
    }
    return getSuccess({});
  }
}
