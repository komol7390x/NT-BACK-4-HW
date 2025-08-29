import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

interface IProduct{
    name:string
    price:number
    stock_quantity?:number
    image_url?:string
    saller_id:number
    category_id:number
}

export class CreateProductDto implements IProduct {

    @IsString()
    @IsNotEmpty()
    name:string

    @Min(0)
    @IsNumber()
    @IsNotEmpty()
    price:number

    @Min(0)
    @IsNumber()
    @IsOptional()
    stock_quantity:number

    @IsString()
    @IsOptional()
    image_url:string

    @IsNumber()
    @IsNotEmpty()
    saller_id:number

    @IsNumber()
    @IsNotEmpty()
    category_id:number
}
