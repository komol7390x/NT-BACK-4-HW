import { HasMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { ProductModel } from 'src/product/model/product.model';

interface ICategory {
  id?: number;
  name: string;
  image_url: string;
}

@Table({ tableName: 'category' })
export class CategoryModel extends Model<ICategory> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image_url: string;

  @HasMany(() => ProductModel, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  product: ProductModel[];
}
