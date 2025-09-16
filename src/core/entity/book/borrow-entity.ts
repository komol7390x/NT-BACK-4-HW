import { BaseEntity } from "src/common/database/base-entity";
import { Column, Entity } from "typeorm";

@Entity('borrow')
export class BorrowEntity extends BaseEntity {

    // ------------------ BORROW DATE ------------------

    @Column({ type: 'varchar'})
    borrow_date: string

    // ------------------ DUE DATE ------------------

    @Column({ type: 'varchar' })
    due_date: string

    // ------------------ RETURN DATE ------------------

    @Column({ type: 'varchar' })
    return_date: string

    // ------------------ OVERDUE------------------

    @Column({ type: 'boolean',default: false })
    overdue: boolean
}