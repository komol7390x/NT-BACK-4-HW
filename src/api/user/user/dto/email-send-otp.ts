import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsNumber, } from "class-validator"

export class EmailWithDto {
    @ApiProperty({ description: 'User full email', example: 'User123' })
    @IsEmail()
    @IsNotEmpty()
    email: string

     @ApiProperty({ description: 'OTP', example: '123456' })
    @IsNumber()
    @IsNotEmpty()
    otp: string
}