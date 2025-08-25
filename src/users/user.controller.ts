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
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @ApiResponse({ status: 201, description: 'Foydalanuvchi yaratildi' })
  @ApiResponse({ status: 400, description: "Xatov so'rov" })
  @Post()
  create(@Body() CrateUsersDto: CrateUsersDto) {
    return this.UserService.create(CrateUsersDto);
  }

  @ApiResponse({ status: 200, description: 'Barcha foydalanuvchi ' })
  @ApiResponse({ status: 400, description: "Xatov so'rov" })
  @Get()
  getAll() {
    return this.UserService.getAll();
  }

  @ApiResponse({ status: 200, description: 'Foydalanuvchi' })
  @ApiResponse({ status: 400, description: "Xatov so'rov" })
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
