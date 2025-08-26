import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSallerDto } from './dto/create-saller.dto';
import { UpdateSallerDto } from './dto/update-saller.dto';
import { InjectModel } from '@nestjs/sequelize';
import { SallerModel } from './model/saller.model';
import { IResponse } from 'src/interface/success-res';
import { getRessponse } from 'src/utils/getResponse';

@Injectable()
export class SallerService {
  constructor(
    @InjectModel(SallerModel) private readonly sallerModel: typeof SallerModel,
  ) {}

  async create(createAdminDto: CreateSallerDto): Promise<IResponse> {
    const { email } = createAdminDto;
    const existsEmail = await this.sallerModel.findOne({ where: { email } });
    if (existsEmail) {
      throw new ConflictException('already exist email');
    }
    const result = await this.sallerModel.create(createAdminDto);
    return getRessponse(result, 201);
  }

  async findAll() {
    const result = await this.sallerModel.findAll();
    return getRessponse(result);
  }

  async findOne(id: number) {
    const admin = await this.sallerModel.findByPk(id);
    if (!admin) {
      throw new NotFoundException();
    }
    return getRessponse(admin);
  }

  async update(id: number, UpdateSallerDto: UpdateSallerDto) {
    const { email } = UpdateSallerDto;
    const admin = await this.sallerModel.findByPk(id);
    if (!admin) {
      throw new NotFoundException();
    }
    if (email) {
      const existsEmail = await this.sallerModel.findOne({ where: { email } });
      if (existsEmail && existsEmail.id != id) {
        throw new NotFoundException();
      }
    }
    const result = await this.sallerModel.update(UpdateSallerDto, {
      where: { id },
      returning: true,
    });
    if (result[0] === 0) {
      throw new NotFoundException('Saller not found');
    }
    return getRessponse(result[1][0]);
  }

  async remove(id: number) {
    const result = await this.sallerModel.destroy({ where: { id } });
    if (!result) {
      throw new NotFoundException('Saller not found');
    }
    return getRessponse({});
  }
}
