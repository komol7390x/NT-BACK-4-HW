import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('product')
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', nullable: false,unique:true })
    name: string

    @Column({ type: 'int', nullable: false })
    price: number

    @Column({ type: 'int', nullable: false, default: 0 })
    stock_quantity: number

    @Column({ type: 'varchar', nullable: true })
    image_url: string

    @Column({ type: 'int', nullable: false })
    saller_id: number

    @Column({ type: 'int', nullable: false })
    category_id:number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: number
}
