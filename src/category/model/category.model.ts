import { Column, DataType, Model, Table } from 'sequelize-typescript';

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
}
