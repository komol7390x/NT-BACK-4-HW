import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { IResponse } from 'src/interface/success-interface';
import { successRes } from 'src/utils/successRes';
import { Saller } from 'src/modules/users/saller/entities/saller.entity';
import { Category } from '../category/entities/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly product: Repository<Product>,
    @InjectRepository(Saller) private readonly sallerModel: Repository<Saller>,
    @InjectRepository(Category) private readonly categoryModel: Repository<Category>
  ) { }

  // ================================= CREATE ================================= \\
  async create(createDto: CreateProductDto): Promise<IResponse> {

    const { name, category_id, saller_id, ...rest } = createDto;
    const existName = await this.product.findOne({ where: { name } });

    if (existName) {
      throw new ConflictException(`this name => ${name} already exist on Product`);
    }

    const saller = await this.sallerModel.findOne({ where: { id: saller_id } })
    if (!saller) {
      throw new NotFoundException(`not found this id => ${saller_id} on Saller`)
    }

    const category = await this.categoryModel.findOne({ where: { id: category_id } })
    if (!category) {
      throw new NotFoundException(`not found this id => ${category_id} on Category`)
    }

    const result = await this.product.save({ ...rest, name, saller, category, });
    return successRes(result, 201);
  }

  // ================================= FIND ALL ================================= \\
  async findAll(): Promise<IResponse> {
    const result = await this.product.find({
      relations: {
        category: true,
        saller: true
      },
      order: {
        createdAt: 'DESC'
      }
    });
    return successRes(result);
  }

  // ================================= FIND ONE ================================= \\
  async findOne(id: number): Promise<IResponse> {

    const result = await this.product.findOne({
      where: { id },
      relations: {
        category: true,
        saller: true
      }
    });
    if (!result) {
      throw new NotFoundException(`not found this id => ${id} on Product`);
    }

    return successRes(result);
  }

  // ================================= UPDATE ================================= \\
  async update(
    id: number,
    updateDto: UpdateProductDto,
  ): Promise<IResponse> {
    const { name, category_id, saller_id } = updateDto;

    if (name) {
      const existName = await this.product.findOne({ where: { name } });
      if (existName) {
        throw new ConflictException(`this name => ${name} already exist`);
      }
    }

    await this.product.update(id, updateDto);

    const result = await this.product.findOne({ where: { id } });
    if (!result) {
      throw new NotFoundException(`not found this id => ${id} on Product`);
    }

    return successRes(result);
  }

  // ================================= DELETE ================================= \\
  async remove(id: number): Promise<IResponse> {

    const result = await this.product.delete({ id });
    if (result.affected == 0) {
      throw new NotFoundException(`not found this id => ${id} on Product`);
    }

    return successRes({});
  }
}
