import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  image_url?: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  stockQuantity: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  saller_id: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  category_id: number;
}