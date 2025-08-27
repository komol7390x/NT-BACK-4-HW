import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from './schema/admin.schema';
import { Model } from 'mongoose';
import { getSuccess } from 'src/utils/success-res';
import { IResponse } from 'src/interface/success-res-interface';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private readonly AdminModel: Model<Admin>,
  ) {}

  // =========================== CREATE =========================== \\
  async create(createAdminDto: CreateAdminDto): Promise<IResponse> {
    const { email } = createAdminDto;
    const exist = await this.AdminModel.findOne({ email });
    if (exist) {
      throw new ConflictException('Email already added');
    }
    const result = await this.AdminModel.create(createAdminDto);

    return getSuccess(result, 201);
  }

  // =========================== FIND ALL =========================== \\
  async findAll(): Promise<IResponse> {
    const result = await this.AdminModel.find();
    return getSuccess(result);
  }
  // =========================== FIND ONE =========================== \\
  async findOne(id: string): Promise<IResponse> {
    const result = await this.AdminModel.findById(id);
    if (!result) {
      throw new NotFoundException();
    }
    return getSuccess(result);
  }

  // =========================== UPDATE =========================== \\
  async update(id: string, updateAdminDto: UpdateAdminDto): Promise<IResponse> {
    const { email } = updateAdminDto;
    if (email) {
      const exist = await this.AdminModel.findOne({ email });
      if (exist && exist.id != id) {
        throw new ConflictException('Email already added');
      }
    }
    const result = await this.AdminModel.findByIdAndUpdate(id, updateAdminDto, {
      new: true,
    });
    if (!result) {
      throw new NotFoundException();
    }
    return getSuccess(result);
  }
  // =========================== DELETE =========================== \\
  async remove(id: string): Promise<IResponse> {
    const result = await this.AdminModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException();
    }
    return getSuccess({});
  }
}
