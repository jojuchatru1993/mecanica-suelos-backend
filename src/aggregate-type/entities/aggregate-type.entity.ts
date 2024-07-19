import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('aggregate_type')
export class AggregateType {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    aggregateType: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    //TODO: Agregar relacion para agregado

    @BeforeInsert()
    @BeforeUpdate()
    sanitizeFields() {
        this.aggregateType = this.aggregateType.toLocaleUpperCase().trim();
    }
}
