import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  stock_quantity: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsMongoId()
  @IsNotEmpty()
  seller_id: string;

  @IsMongoId()
  @IsNotEmpty()
  category_id: string;

  @IsString()
  @IsOptional()
  image_url?: string;
}
