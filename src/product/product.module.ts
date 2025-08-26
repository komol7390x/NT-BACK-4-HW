import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductModel } from './model/product.model';
import { AdminModel } from 'src/admin/model/admin.model';

@Module({
  imports: [SequelizeModule.forFeature([ProductModel, AdminModel])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
