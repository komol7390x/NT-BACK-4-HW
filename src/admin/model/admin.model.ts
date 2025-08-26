import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ProductModel } from 'src/product/model/product.model';

interface IAdmin {
  id?: number;
  full_name: string;
  email: string;
  age: number;
  balance?: number;
}

@Table({ tableName: 'admins' })
export class AdminModel extends Model<IAdmin> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare full_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare age: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: 0,
  })
  declare balance: number;

  @HasMany(() => ProductModel, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  declare products: ProductModel[];
}

export class Admin {}
