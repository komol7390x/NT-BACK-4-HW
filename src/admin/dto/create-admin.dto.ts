import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsNumber()
  @IsOptional()
  balance: number;
}
