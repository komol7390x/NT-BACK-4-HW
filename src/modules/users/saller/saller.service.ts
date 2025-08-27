import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSallerDto } from './dto/create-saller.dto';
import { UpdateSallerDto } from './dto/update-saller.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Saller } from './schema/saller.schema';
import { Model } from 'mongoose';
import { getSuccess } from 'src/utils/success-res';
import { IResponse } from 'src/interface/success-res-interface';

@Injectable()
export class SallerService {
  constructor(
    @InjectModel(Saller.name) private readonly AdminModel: Model<Saller>,
  ) {}

  // =========================== CREATE =========================== \\
  async create(CreateSallerDto: CreateSallerDto): Promise<IResponse> {
    const { email } = CreateSallerDto;
    const exist = await this.AdminModel.findOne({ email });
    if (exist) {
      throw new ConflictException('Email already added');
    }
    const result = await this.AdminModel.create(CreateSallerDto);

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
  async update(
    id: string,
    UpdateSallerDto: UpdateSallerDto,
  ): Promise<IResponse> {
    const { email } = UpdateSallerDto;
    if (email) {
      const exist = await this.AdminModel.findOne({ email });
      if (exist && exist.id != id) {
        throw new ConflictException('Email already added');
      }
    }
    const result = await this.AdminModel.findByIdAndUpdate(
      id,
      UpdateSallerDto,
      { new: true },
    );
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
