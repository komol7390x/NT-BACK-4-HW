import { AdminRoles } from "src/common/enum/Role";
import { BaseEntity, Column, Entity } from "typeorm";

@Entity('admin')
export class AdminEntity extends BaseEntity{
    @Column({type:'varchar',unique:true})
    username:string

    @Column({type:'varchar'})
    hashed_password:string

    @Column({type:'boolean',default:false})
    is_active:boolean

    @Column({type:'enum', enum:AdminRoles,default:AdminRoles.ADMIN})
    role:AdminRoles
}