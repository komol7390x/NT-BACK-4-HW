import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IAdmin {
  id?: number;
  full_name: string;
  email: string;
  age?: number;
}

@Table({ tableName: 'admins' })
export class AdminModel extends Model<IAdmin> {
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
}
