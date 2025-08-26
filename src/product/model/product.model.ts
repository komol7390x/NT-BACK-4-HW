import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { AdminModel } from 'src/admin/model/admin.model';

interface IProduct {
  id?: number;
  name: string;
  price: number;
  stock_quantity: number;
  admin_id: number;
}

@Table({ tableName: 'products' })
export class ProductModel extends Model<IProduct> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare price: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: 0,
  })
  declare stock_quantity: number;

  @ForeignKey(() => AdminModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare admin_id: number;

  @BelongsTo(() => AdminModel)
  declare admin: AdminModel;
}
