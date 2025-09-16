import { BaseEntity } from "src/common/database/base-entity";
import { AdminRoles } from "src/common/enum/Role";
import { Column, Entity } from "typeorm";

@Entity('book')
export class BookEntity extends BaseEntity {

    // ------------------ TITLE ------------------

    @Column({ type: 'varchar', unique: true })
    title: string

    // ------------------ AUTHOR ------------------

    @Column({ type: 'varchar' })
    author: string

    // ------------------ PUBLISHED YEAR ------------------

    @Column({ type: 'varchar' })
    published_year: string

    // ------------------ AVIALABLE------------------

    @Column({ type: 'boolean', nullable: true, default: false })
    avialable: boolean
}