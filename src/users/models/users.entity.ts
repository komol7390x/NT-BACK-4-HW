import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
// import { BookModel } from 'src/books/models/book.model';

interface IUser {
  id?: number;
  full_name: string;
  email: string;
  image_url?: string;
}

@Table({ tableName: 'users' })
export class UserModel extends Model<IUser> {
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
    type: DataType.STRING,
  })
  image_url: string;

  // @HasMany(() => BookModel, {
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE'
  // })
  // books: BookModel[];
}