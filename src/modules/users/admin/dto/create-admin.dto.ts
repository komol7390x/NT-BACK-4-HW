import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto {
  @ApiProperty({
    description: "Adminning to'liq ismi",
    example: "Toshpo\'lat Mamatov",
  })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({
    description: "Admin email manzili",
    example: "admin@example.com",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: "Admin yoshi",
    example: 30,
  })
  @IsNumber()
  @IsNotEmpty()
  age: number;
}
