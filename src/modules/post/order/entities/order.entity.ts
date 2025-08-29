import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('order')
export class Order {
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'int'})
    quantity:number

    @Column({type:'int'})
    price:number

    @Column({type:'int'})
    total_price:number

    @Column({type:'int'})
    customer_id:number

    @Column({type:'int'})
    product_id:number

    @CreateDateColumn()
    createdAt:Date

    @UpdateDateColumn()
    updatedAt:number
}
