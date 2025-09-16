import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty } from "class-validator"

export class EmailUserDto {
    @ApiProperty({ description: 'User full email', example: 'User123' })
    @IsEmail()
    @IsNotEmpty()
    email: string
}