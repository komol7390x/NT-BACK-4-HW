import { Injectable } from '@nestjs/common';
import { IUser } from './entity/user.entity';
import { createUserDto } from './dto/create-user';

@Injectable()
export class UserService {
    private users: IUser[] = [];
    
  create = async (createUserDto: createUserDto) => {
    this.users.push(createUserDto);
    return this.users;
  };
}
