import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class SignInUSerDto {
  // --------------------------------------- EMAIL ---------------------------------------
  @ApiProperty({
    description: 'User email',
    example: 'wwww.exmaple@gmail.com',
    minLength: 3,
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  // --------------------------------------- PASSSWORD ---------------------------------------
  @ApiProperty({
    description: 'User password',
    example: '@Komol7390x',
  })
  @IsNotEmpty()
  password: string;
}