import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSallerDto {
  @ApiProperty({
    example: 'John Doe',
    description: "Sotuvchining to'liq ismi",
  })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'Sotuvchining email manzili',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 30,
    description: 'Sotuvchining yoshi',
  })
  @IsNumber()
  @IsNotEmpty()
  age: number;
}
