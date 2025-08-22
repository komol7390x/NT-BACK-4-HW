import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './entities/user.entity';
import { v4 } from 'uuid'

@Injectable()

export class UsersService {
  private users: IUser[] = []
  create(createUserDto: CreateUserDto) {
    const newUser = { id: v4(), ...createUserDto }
    this.users.push(newUser)
    return {
      statusCode: 201,
      message: 'success',
      data: newUser
    }
  }

  findAll() {
    return {
      statusCode: 200,
      message: 'success',
      data: this.users
    }
  }

  findOne(id: string) {
    const result = this.users.find((user: IUser) => user.id == id)
    if (!result) {
      throw new NotFoundException()
    }
    return {
      statusCode: 200,
      message: 'success',
      data: result
    }
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const index = this.users.findIndex(user => user.id == id)
    if (index==-1) {
      throw new HttpException('not found user', HttpStatus.NOT_FOUND)
    }
    this.users[index] = {id, ...updateUserDto}
    console.log(this.users[index]);
    
    return {
      statusCode: 200,
      message: 'success',
      data: this.users[index]
    }
  }

  remove(id: string) {
    const index = this.users.findIndex(user => user.id == id)
    if (index) {
      throw new HttpException('not found user', HttpStatus.NOT_FOUND)
    }
    if (index==-1) {
      throw new HttpException('not found user', HttpStatus.NOT_FOUND)
    }
    this.users.splice(index, 1)
    return {
      statusCode: 200,
      message: 'success',
      data: {}
    }
  }
}
