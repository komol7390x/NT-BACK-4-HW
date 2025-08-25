import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';
export class CrateUsersDto {
  @ApiProperty({ example: 'Joh Wick', description: 'User name' })
  @IsString()
  fullName: string;

  @ApiProperty({ example: 27, description: 'user age' })
  @IsNumber()
  age: number;
}
