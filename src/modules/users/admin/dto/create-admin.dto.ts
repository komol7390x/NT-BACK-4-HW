import {IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Matches} from 'class-validator'
export class CreateAdminDto {

    @IsString()
    @IsNotEmpty()
    full_name:string

    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsNumber()
    @IsNotEmpty()
    age:number

    @IsString()
    @Matches(/^998/, { message: "Telefon +998 bilan boshlanishi kerak" })
    @IsOptional()
    phone_number:string
}
