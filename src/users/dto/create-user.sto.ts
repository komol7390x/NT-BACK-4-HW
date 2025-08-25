import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';
export class CrateUsersDto {
  @ApiProperty({ example: 'Joh Wick', description: 'User name' })
  @IsString()
  full_name: string;

  @ApiProperty({ example: 'wwww.example@gmail.com', description: 'wwww.example@gmail.com' })
  @IsString()
  email: string;
}
