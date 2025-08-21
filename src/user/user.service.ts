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

  update = async (createUserDto: createUserDto) => {
    const oldKey = Object.keys(createUserDto)[0] as keyof IUser;
    const oldValue = Object.values(createUserDto)[0];

    const newValue = Object.values(createUserDto);
    const findIndex = this.users.findIndex((item) => item[oldKey] == oldValue);
    if (findIndex == -1) {
      return 'not found user';
    }
    this.users[findIndex][oldKey] = newValue as never;
    return this.users[findIndex];
  };

  delete = async (createUserDto: createUserDto) => {
    const key = Object.keys(createUserDto)[0] as keyof IUser;
    const value = Object.values(createUserDto)[0];
    this.users.filter((item) => !item[key] == value);
    return {};
  };
}
