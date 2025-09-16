import { PartialType } from '@nestjs/swagger';
import { CreateBookHistoryDto } from './create-book_history.dto';

export class UpdateBookHistoryDto extends PartialType(CreateBookHistoryDto) {}
