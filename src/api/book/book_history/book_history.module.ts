import { Module } from '@nestjs/common';
import { BookHistoryService } from './book_history.service';
import { BookHistoryController } from './book_history.controller';

@Module({
  controllers: [BookHistoryController],
  providers: [BookHistoryService],
})
export class BookHistoryModule {}
