import { Injectable } from '@nestjs/common';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';
import { BaseService } from 'src/infrastructure/base/base-service';
import { BorrowEntity } from 'src/core/entity/book/borrow-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BorrowService extends BaseService<CreateBorrowDto,UpdateBorrowDto,BorrowEntity> {
  constructor(@InjectRepository(BorrowEntity) private readonly bookRepo:Repository<BorrowEntity> ) {super(bookRepo)}
}
