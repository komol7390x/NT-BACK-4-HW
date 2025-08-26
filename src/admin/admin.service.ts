import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { AdminModel } from './model/admin.model';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(AdminModel) private readonly Admin: typeof AdminModel,
  ) {}
  async create(createAdminDto: CreateAdminDto) {
    const { email } = createAdminDto;
    const exists = await this.Admin.findOne({ where: { email } });
    if (exists) {
      throw new ConflictException();
    }
  }

  async findAll() {
    return `This action returns all admin`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  async remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
