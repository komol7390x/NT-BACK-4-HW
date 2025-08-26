import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryModel } from 'src/category/model/category.model';
import { ProductModel } from './model/product.model';
import { SallerModel } from 'src/saller/model/saller.model';

@Module({
  imports: [
    SequelizeModule.forFeature([ProductModel, CategoryModel, SallerModel]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}