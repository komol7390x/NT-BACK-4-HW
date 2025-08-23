import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CrateUsersDto } from './dto/create-user.sto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Post()
  create(@Body() CrateUsersDto: CrateUsersDto) {
    return this.UserService.create(CrateUsersDto);
  }

  @Get()
  getAll() {
    return this.UserService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.UserService.getById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateUsersDto: UpdateUsersDto) {
    return this.UserService.update(id, UpdateUsersDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.UserService.remove(id);
  }
}
