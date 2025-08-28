import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('admin')
export class Admin {

    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'varchar'})
    full_name:string

    @Column({type:'varchar',unique:true})
    email:string

    @Column({type:'int'})
    age:number

    @Column({type:'int',nullable:true})
    phone_number:string

    @CreateDateColumn()
    createAt:Date

    @UpdateDateColumn()
    updateAt:Date
}
