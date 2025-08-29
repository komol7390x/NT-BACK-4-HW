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

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly product: Repository<Product>,
  ) {}

  // ================================= CREATE ================================= \\
  async create(createDto: CreateProductDto): Promise<IResponse> {
    const { name } = createDto;
    const existName = await this.product.findOne({ where: { name } });
    if (existName) {
      throw new ConflictException(`this name => ${name} already exist on Product`);
    }
    const result = await this.product.save(createDto);
    return successRes(result, 201);
  }

  // ================================= FIND ALL ================================= \\
  async findAll(): Promise<IResponse> {
    const result = await this.product.find();
    return successRes(result);
  }

  // ================================= FIND ONE ================================= \\
  async findOne(id: number): Promise<IResponse> {
    const result = await this.product.findOne({ where: { id } });
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
    const { name } = updateDto;
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
