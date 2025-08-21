import { Body, Controller, Post } from '@nestjs/common';
import { createUserDto } from './dto/create-user';
import { UserService } from './user.service';

@Controller('users')
    
export class userController {
  constructor(private readonly UserService: UserService) {}

  @Post()
  create(@Body() createUserDto: createUserDto) {
    return this.UserService.create(createUserDto);
  }
}
