import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface ISaller {
  id?: number;
  full_name: string;
  email: string;
  age?: number;
  balance?:number
}

@Table({ tableName: 'sallers' })
export class SallerModel extends Model<ISaller> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  full_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.INTEGER,
  })
  age: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue:0
  })
  balance: number;
}
