import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { AdminModel } from './models/admin.model';
import { IResponse } from 'src/interface/success-res';
import { getRessponse } from 'src/utils/getResponse';

@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(AdminModel) private readonly adminModel: typeof AdminModel,
  ) {}

  async create(createAdminDto: CreateAdminDto): Promise<IResponse> {
    const { email } = createAdminDto;
    const existsEmail = await this.adminModel.findOne({ where: { email } });
    if (existsEmail) {
      throw new ConflictException('already exist email');
    }
    const result = await this.adminModel.create(createAdminDto);
    return getRessponse(result, 201);
  }

  async findAll() {
    const result = await this.adminModel.findAll();
    return getRessponse(result);
  }

  async findOne(id: number) {
    const admin = await this.adminModel.findByPk(id);
    if (!admin) {
      throw new NotFoundException();
    }
    return getRessponse(admin);
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const { email } = updateAdminDto;
    const admin = await this.adminModel.findByPk(id);
    if (!admin) {
      throw new NotFoundException();
    }
    if (email) {
      const existsEmail = await this.adminModel.findOne({ where: { email } });
      if (existsEmail && existsEmail.id != id) {
        throw new NotFoundException();
      }
    }
    const result = await this.adminModel.update(updateAdminDto, {
      where: { id },
      returning: true,
    });
    if (result[0] === 0) {
      throw new NotFoundException('Author not found');
    }
    return getRessponse(result[1][0]);
  }

  async remove(id: number) {
    const result = await this.adminModel.destroy({ where: { id } });
    if (!result) {
      throw new NotFoundException('Author not found');
    }
    return getRessponse({});
  }
}
