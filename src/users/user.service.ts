import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CrateUsersDto } from './dto/create-user.sto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { UserModel } from './models/users.entity';
import { InjectModel } from '@nestjs/sequelize';
import { IResponse } from 'src/interface/success-res';
import { getSuccessRes } from 'src/utils/getSuccess';

@Injectable()
export class UserService {
  constructor(@InjectModel(UserModel) private readonly userModel:typeof UserModel  ){}
  
  create = async (CrateUsersDto: CrateUsersDto):Promise<IResponse> => {
    const existEmail =await this.userModel.findOne({where:{email:CrateUsersDto.email}})
    if(existEmail){
      throw new ConflictException('already added email')
    }    
    const result=await this.userModel.create(CrateUsersDto)  
    return getSuccessRes(result,201)
  };

  getAll = async ():Promise<IResponse> => {
    const result=await this.userModel.findAll()
    return getSuccessRes(result)
  };

  getById = async (id: string) => {
    const user=await this.userModel.findByPk(id)
    if(!user){
      throw new NotFoundException()
    }
    return getSuccessRes(user)
  };

  update = async (id: string, UpdateUsersDto: UpdateUsersDto) => {
   if (UpdateUsersDto.email) {
      const existsEmail = await this.userModel.findOne({
        where: { email: UpdateUsersDto.email },
      });
      if (existsEmail && existsEmail?.id != id) {
        throw new ConflictException('Email already exists');
      }
    }
    const author = await this.userModel.update(UpdateUsersDto, {
      where: { id },
      returning: true,
    });
    if (author[0] === 0) {
      throw new NotFoundException('Author not found');
    }
    return getSuccessRes(author[1][0]);
  };

  remove = async (id: string) => {
     const author = await this.userModel.destroy({ where: { id } });
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    return getSuccessRes({});
  };
}
