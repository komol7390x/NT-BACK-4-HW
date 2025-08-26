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
  name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: 0,
  })
  stock_quantity: number;

  @ForeignKey(() => AdminModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  admin_id: number;

  @BelongsTo(() => AdminModel)
  admin: AdminModel[];
}
