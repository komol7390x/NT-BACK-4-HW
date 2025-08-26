import { Column, DataType, Model, Table } from 'sequelize-typescript';

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
  price: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: 0,
  })
  stock_quantity: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  admin_id: string;
}
