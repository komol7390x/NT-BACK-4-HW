import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ProductModel } from './model/product.model';
import { IResponse } from 'src/interface/success-res';
import { getRessponse } from 'src/utils/getResponse';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductModel)
    private readonly productModel: typeof ProductModel,
  ) {}

  async create(CreateProductDto: CreateProductDto): Promise<IResponse> {
    const { name } = CreateProductDto;
    const existsName = await this.productModel.findOne({ where: { name } });
    if (existsName) {
      throw new ConflictException('already exist email');
    }
    const result = await this.productModel.create(CreateProductDto);
    return getRessponse(result, 201);
  }

  async findAll() {
    const result = await this.productModel.findAll({ include: { all: true } });
    return getRessponse(result);
  }

  async findOne(id: number) {
    const admin = await this.productModel.findByPk(id, {
      include: { all: true },
    });
    if (!admin) {
      throw new NotFoundException();
    }
    return getRessponse(admin);
  }

  async update(id: number, UpdateProductDto: UpdateProductDto) {
    const { name } = UpdateProductDto;
    const admin = await this.productModel.findByPk(id);
    if (!admin) {
      throw new NotFoundException();
    }
    if (name) {
      const existName = await this.productModel.findOne({
        where: { name },
      });
      if (existName && existName.id != id) {
        throw new NotFoundException();
      }
    }
    const result = await this.productModel.update(UpdateProductDto, {
      where: { id },
      returning: true,
    });
    if (result[0] === 0) {
      throw new NotFoundException('product not found');
    }
    return getRessponse(result[1][0]);
  }

  async remove(id: number) {
    const result = await this.productModel.destroy({ where: { id } });
    if (!result) {
      throw new NotFoundException('product not found');
    }
    return getRessponse({});
  }
}