import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateProductDto {

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
