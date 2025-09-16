import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateBookHistoryDto {
        // ------------------ TITLE ------------------
    
        @ApiProperty({description:'Action',example:'action'})
        @IsString()
        @IsNotEmpty()
        action: string
    }

