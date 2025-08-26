import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ProductModel } from './model/product.model';
import { IResponse } from 'src/interface/success-interface';
import { successRes } from 'src/utils/success-res';
import { AdminModel } from 'src/admin/model/admin.model';
@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductModel) private readonly Product: typeof ProductModel,
    @InjectModel(AdminModel) private readonly Admin: typeof AdminModel,
  ) {}

  // =========================== CREATE =========================== \\
  async create(createProductDto: CreateProductDto): Promise<IResponse> {
    const { name, admin_id } = createProductDto;
    const exists = await this.Product.findOne({ where: { name } });
    if (exists) {
      throw new ConflictException();
    }
    const existAdmin = await this.Admin.findOne({ where: { id: admin_id } });
    if (!existAdmin) {
      throw new NotFoundException();
    }
    const result = await this.Product.create(createProductDto);
    return successRes(result, 201);
  }

  // =========================== FIND ALL =========================== \\
  async findAll(): Promise<IResponse> {
    const result = await this.Product.findAll();
    return successRes(result, 201);
  }

  // =========================== FIND ONE =========================== \\
  async findOne(id: number): Promise<IResponse> {
    const product = await this.Product.findByPk(id);
    if (!product) {
      throw new NotFoundException();
    }
    return successRes(product);
  }

  // =========================== UPDATE =========================== \\
  async update(id: number, updateProductDto: UpdateProductDto) {
    const { name, admin_id } = updateProductDto;
    if (name) {
      const exists = await this.Product.findOne({ where: { name } });
      if (exists?.dataValues?.id != id && exists) {
        throw new ConflictException();
      }
    }
    const existAdmin = await this.Admin.findOne({ where: { id: admin_id } });
    if (!existAdmin) {
      throw new NotFoundException('not found Admin id');
    }
    const result = await this.Product.update(updateProductDto, {
      where: { id },
      returning: true,
    });
    if (result[0] == 0) {
      throw new NotFoundException();
    }
    return successRes(result[1][0]);
  }

  // =========================== REMOVE =========================== \\
  async remove(id: number) {
    const result = await this.Product.destroy({ where: { id } });
    if (!result) {
      throw new NotFoundException();
    }
    return successRes({});
  }
}
