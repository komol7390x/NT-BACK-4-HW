import { PartialType } from '@nestjs/mapped-types';
import { createUserDto } from './create-user';

export class UpdateUsrDto extends PartialType(createUserDto) {}
