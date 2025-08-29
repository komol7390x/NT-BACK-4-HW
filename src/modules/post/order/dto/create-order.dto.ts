import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateOrderDto {
    @IsNumber()
    @IsNotEmpty()
    quantity:number

    @IsNumber()
    @IsNotEmpty()
    customer_id:number

    @IsNumber()
    @IsNotEmpty()
    product_id:number
}
