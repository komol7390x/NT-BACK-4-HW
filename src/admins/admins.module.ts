import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminModel } from './models/admin.model';

@Module({
  imports:[SequelizeModule.forFeature([AdminModel])],
  controllers: [AdminsController],
  providers: [AdminsService],
})
export class AdminsModule {}
