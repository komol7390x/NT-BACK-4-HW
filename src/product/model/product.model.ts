import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { CategoryModel } from 'src/category/model/category.model';
import { SallerModel } from 'src/saller/model/saller.model';

interface IProduct {
  id?: number;
  name: string;
  image_url?: string;
  stockQuantity: number;
  price: number;
  saller_id: number;
  category_id: number;
}

@Table({ tableName: 'product' })
export class ProductModel extends Model<IProduct> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  image_url: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  stockQuantity: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price: number;

  @ForeignKey(() => SallerModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  saller_id: number;

  @ForeignKey(() => CategoryModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  category_id: number;

  @BelongsTo(() => CategoryModel)
  category: CategoryModel;

  @BelongsTo(() => SallerModel)
  saller: SallerModel;
}