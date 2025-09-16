import { Injectable } from '@nestjs/common';
import { CreateBookHistoryDto } from './dto/create-book_history.dto';
import { UpdateBookHistoryDto } from './dto/update-book_history.dto';

@Injectable()
export class BookHistoryService {
  create(createBookHistoryDto: CreateBookHistoryDto) {
    return 'This action adds a new bookHistory';
  }

  findAll() {
    return `This action returns all bookHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookHistory`;
  }

  update(id: number, updateBookHistoryDto: UpdateBookHistoryDto) {
    return `This action updates a #${id} bookHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookHistory`;
  }
}
