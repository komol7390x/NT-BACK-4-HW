import { IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  total_price: number;

  @IsMongoId()
  @IsNotEmpty()
  product_id: string;

  @IsMongoId()
  @IsNotEmpty()
  customer_id: string;
}
