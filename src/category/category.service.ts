import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { CategoryModel } from './model/category.model';
import { IResponse } from 'src/interface/success-res';
import { getRessponse } from 'src/utils/getResponse';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(CategoryModel)
    private readonly categoryModel: typeof CategoryModel,
  ) {}

  async create(CreateCategoryDto: CreateCategoryDto): Promise<IResponse> {
    const { name } = CreateCategoryDto;
    const existsName = await this.categoryModel.findOne({ where: { name } });
    if (existsName) {
      throw new ConflictException('already exist email');
    }
    const result = await this.categoryModel.create(CreateCategoryDto);
    return getRessponse(result, 201);
  }

  async findAll() {
    const result = await this.categoryModel.findAll();
    return getRessponse(result);
  }

  async findOne(id: number) {
    const admin = await this.categoryModel.findByPk(id);
    if (!admin) {
      throw new NotFoundException();
    }
    return getRessponse(admin);
  }

  async update(id: number, UpdateCategoryDto: UpdateCategoryDto) {
    const { name } = UpdateCategoryDto;
    const admin = await this.categoryModel.findByPk(id);
    if (!admin) {
      throw new NotFoundException();
    }
    if (name) {
      const existName = await this.categoryModel.findOne({
        where: { name },
      });
      if (existName && existName.id != id) {
        throw new NotFoundException();
      }
    }
    const result = await this.categoryModel.update(UpdateCategoryDto, {
      where: { id },
      returning: true,
    });
    if (result[0] === 0) {
      throw new NotFoundException('Author not found');
    }
    return getRessponse(result[1][0]);
  }

  async remove(id: number) {
    const result = await this.categoryModel.destroy({ where: { id } });
    if (!result) {
      throw new NotFoundException('Author not found');
    }
    return getRessponse({});
  }
}
