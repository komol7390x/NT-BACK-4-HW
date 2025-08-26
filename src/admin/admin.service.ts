import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { AdminModel } from './model/admin.model';
import { IResponse } from 'src/interface/success-interface';
import { successRes } from 'src/utils/success-res';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(AdminModel) private readonly Admin: typeof AdminModel,
  ) {}

  // =========================== CREATE =========================== \\
  async create(createAdminDto: CreateAdminDto): Promise<IResponse> {
    const { email } = createAdminDto;
    const exists = await this.Admin.findOne({ where: { email } });
    if (exists) {
      throw new ConflictException();
    }
    const result = await this.Admin.create(createAdminDto);
    return successRes(result, 201);
  }

  // =========================== FIND ALL =========================== \\
  async findAll(): Promise<IResponse> {
    const result = await this.Admin.findAll({ include: { all: true } });
    return successRes(result, 201);
  }

  // =========================== FIND ONE =========================== \\
  async findOne(id: number): Promise<IResponse> {
    const admin = await this.Admin.findByPk(id, { include: { all: true } });
    if (!admin) {
      throw new NotFoundException();
    }
    return successRes(admin);
  }

  // =========================== UPDATE =========================== \\
  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const { email } = updateAdminDto;
    if (email) {
      const existsEmail = await this.Admin.findOne({ where: { email } });
      if (existsEmail?.dataValues?.id != id && existsEmail) {
        throw new ConflictException();
      }
    }
    const result = await this.Admin.update(updateAdminDto, {
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
    const result = await this.Admin.destroy({ where: { id } });
    if (!result) {
      throw new NotFoundException();
    }
    return successRes({});
  }
}
