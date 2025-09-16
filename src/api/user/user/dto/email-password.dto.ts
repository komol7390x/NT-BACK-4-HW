import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsNumber, IsStrongPassword, } from "class-validator"

export class EmailPassword {
    @ApiProperty({ description: 'User full email', example: 'User123' })
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({ description: 'nes password', example: '@Userr000012!@' })
    @IsStrongPassword()
    @IsNotEmpty()
    new_password: string
}