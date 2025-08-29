import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { Saller } from 'src/modules/users/saller/entities/saller.entity';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  name: string;

  @Column({ type: 'int', nullable: false })
  price: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  stock_quantity: number;

  @Column({ type: 'varchar', nullable: true })
  image_url: string;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  category: Category;

  @ManyToOne(() => Saller, (saller) => saller.products, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  saller: Saller;

  @CreateDateColumn({select:false})
  createdAt: Date;

  @UpdateDateColumn({select:false})
  updatedAt: Date;
}
