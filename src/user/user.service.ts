import { Injectable } from '@nestjs/common';
import { IUser } from './entity/user.entity';
import { createUserDto } from './dto/create-user';

@Injectable()
export class UserService {
  private users: IUser[] = [];

  create = async (createUserDto: createUserDto) => {
    this.users.push(createUserDto);
    return this.users.at(-1);
  };

  findAll = async () => {
    return this.users;
  };

  findOne = async (createUserDto: createUserDto) => {
    const key = Object.keys(createUserDto)[0] as keyof IUser;
    const value = Object.values(createUserDto)[0];
    const result = this.users.filter((item) => item[key] === value);
    return result;
  };
}
