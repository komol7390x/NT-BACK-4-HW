import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSallerDto {
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;
}
