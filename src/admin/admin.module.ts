import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminModel } from './model/admin.model';

@Module({
  imports: [SequelizeModule.forFeature([AdminModel])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
