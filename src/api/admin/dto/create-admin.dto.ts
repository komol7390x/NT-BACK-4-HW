import { ApiProperty } from "@nestjs/swagger";
import {IsNotEmpty, IsString, IsStrongPassword, Max, Min} from 'class-validator'
export class CreateAdminDto {
    @ApiProperty({type:'string',example:'username1',description:'username of user'})
    // @Max(128)
    // @Min(3)
    @IsString()
    @IsNotEmpty()
    username:string

    @ApiProperty({type:'string',example:'User123!@',description:'password of user'})
    @IsStrongPassword()
    @IsNotEmpty()
    password:string

}
