import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class CreateAdminDto {
    @ApiProperty({ description: 'Admin full name', example: 'admin123' })
    @IsString()
    @IsNotEmpty()
    full_name: string

    @ApiProperty({ description: 'Admin full email', example: 'www.admin123@gmail.com' })
    @IsEmail()
    @IsNotEmpty()
    username: string

    @ApiProperty({ description: 'Admin full password', example: '@Admin123!@' })
    @IsStrongPassword()
    @IsNotEmpty()
    password: string
}
