import { Module } from '@nestjs/common';
import { UserModule } from './user/user/user.module';
import { BookModule } from './book/book/book.module';
import { BorrowModule } from './book/borrow/borrow.module';
import { BookHistoryModule } from './book/book_history/book_history.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'src/config/env-config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  // -------------------- DATABASE --------------------
  
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    url: String(config.DB_URL,),
    synchronize: true,
    entities: ['dist/core/entity/*.entity{.ts,.js}'],
    autoLoadEntities: true, logging: ['error', 'warn'],
  }),

  // -------------------- JWT --------------------

  JwtModule.register({ global: true }),
    UserModule, BookModule, BorrowModule, BookHistoryModule],
})
export class AppModule { }
