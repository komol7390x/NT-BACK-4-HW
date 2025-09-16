import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookHistoryService } from './book_history.service';
import { CreateBookHistoryDto } from './dto/create-book_history.dto';
import { UpdateBookHistoryDto } from './dto/update-book_history.dto';

@Controller('book-history')
export class BookHistoryController {
  constructor(private readonly bookHistoryService: BookHistoryService) {}

  @Post()
  create(@Body() createBookHistoryDto: CreateBookHistoryDto) {
    return this.bookHistoryService.create(createBookHistoryDto);
  }

  @Get()
  findAll() {
    return this.bookHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookHistoryDto: UpdateBookHistoryDto) {
    return this.bookHistoryService.update(+id, updateBookHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookHistoryService.remove(+id);
  }
}
