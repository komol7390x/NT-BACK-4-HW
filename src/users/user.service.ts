import { Injectable, NotFoundException } from '@nestjs/common';
import { CrateUsersDto } from './dto/create-user.sto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { IUser } from './entities/users.entity';
import { v4 } from 'uuid';

@Injectable()
export class UserService {
  private users: IUser[] = [];

  create = async (CrateUsersDto: CrateUsersDto) => {
    const id = v4().toUpperCase().replace(/-/g, '');
    const newUser = { id, ...CrateUsersDto };
    this.users.push(newUser);
    return {
      message: 'success',
      statusCode: 201,
      data: newUser,
    };
  };

  getAll = async () => {
    return {
      message: 'success',
      statusCode: 200,
      data: this.users,
    };
  };

  getById = async (id: string) => {
    const user = this.users.find((item) => item.id == id);
    if (!user) {
      throw new NotFoundException();
    }
    return {
      message: 'success',
      statusCode: 200,
      data: user,
    };
  };

  update = async (id: string, UpdateUsersDto: UpdateUsersDto) => {
    const index = this.users.findIndex((item) => item.id == id);
    if (index == -1) {
      throw new NotFoundException();
    }
    this.users[index] = { id, ...UpdateUsersDto };
    return {
      message: 'success',
      statusCode: 200,
      data: this.users[index],
    };
  };

  remove = async (id: string) => {
    const index = this.users.findIndex((item) => item.id == id);
    if (index == -1) {
      throw new NotFoundException();
    }
    this.users.splice(index, 1);
    return {
      message: 'success',
      statusCode: 200,
      data: {},
    };
  };
}
