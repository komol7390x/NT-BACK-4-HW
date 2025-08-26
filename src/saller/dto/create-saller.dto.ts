import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSallerDto {
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsOptional()
  age: number;

  @IsNumber()
  @IsOptional()
  balance: number;
}
