import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('admin')
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  full_name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'varchar', length: 13, nullable: true })
  phone_number: string;

  @Column({ type: 'int', default: 0 })
  balance: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
