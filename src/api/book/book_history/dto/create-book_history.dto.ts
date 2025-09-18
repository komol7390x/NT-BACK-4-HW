import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Action } from 'src/common/enum/action';

export class CreateBookHistoryDto {
  @ApiProperty({ description: 'action',example:'Action' })
  @IsString()
  @IsNotEmpty()
  action: string;
}
