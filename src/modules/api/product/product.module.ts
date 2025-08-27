import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schema/product.schema';
import { Saller, SallerSchema } from 'src/modules/users/saller/schema/saller.schema';
import { Category, CategorySchema } from '../category/schema/category.schema';

@Module({
  imports:[MongooseModule.forFeature([
    {name:Product.name,schema:ProductSchema},
    {name:Saller.name,schema:SallerSchema},
    {name:Category.name,schema:CategorySchema}
  ])],
  controllers: [ProductController],
  providers: [ProductService],
  exports:[ProductService]
})
export class ProductModule {}
