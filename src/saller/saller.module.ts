import { Module } from '@nestjs/common';
import { SallerService } from './saller.service';
import { SallerController } from './saller.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SallerModel } from './model/saller.model';

@Module({
  imports:[SequelizeModule.forFeature([SallerModel])],
  controllers: [SallerController],
  providers: [SallerService],
})
export class SallerModule {}
