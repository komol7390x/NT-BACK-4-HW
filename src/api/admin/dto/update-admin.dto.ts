import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateAdminDto } from './create-admin.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
    @ApiPropertyOptional({type:'boolean',description:'Status of Admin',example:true})
    @IsBoolean()
    @IsOptional()
    is_avtive:boolean
}
