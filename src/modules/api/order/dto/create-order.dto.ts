import { IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    example: 10,
    description: 'Qancha olish summasi',
  })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  qauntity: number;

  @ApiProperty({
    example: '64c9a8f5d4f2a6b1c8f7a123',
    description: 'Buyurtma qilinayotgan mahsulotning MongoDB ID si',
  })
  @IsMongoId()
  @IsNotEmpty()
  product_id: string;

  @ApiProperty({
    example: '64c9a8f5d4f2a6b1c8f7b456',
    description: 'Buyurtmani berayotgan mijozning MongoDB ID si',
  })
  @IsMongoId()
  @IsNotEmpty()
  customer_id: string;
}
