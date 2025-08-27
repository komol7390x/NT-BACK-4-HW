import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    example: 'iPhone 15 Pro',
    description: 'Mahsulot nomi',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    example: 100,
    description: 'Mahsulot zaxira soni 10',
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  stock_quantity: number;

  @ApiProperty({
    example: 1200,
    description: 'Mahsulot narxi',
  })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: '64c9a8f5d4f2a6b1c8f7a123',
    description: 'Sotuvchi (Saller) MongoDB ID si',
  })
  @IsMongoId()
  @IsNotEmpty()
  saller_id: string;

  @ApiProperty({
    example: '64c9a8f5d4f2a6b1c8f7b456',
    description: 'Kategoriya MongoDB ID si',
  })
  @IsMongoId()
  @IsNotEmpty()
  category_id: string;

  @ApiPropertyOptional({
    example: 'https://example.com/images/iphone15pro.png',
    description: 'Mahsulot rasmi URL',
  })
  @IsString()
  @IsOptional()
  image_url?: string;
}
