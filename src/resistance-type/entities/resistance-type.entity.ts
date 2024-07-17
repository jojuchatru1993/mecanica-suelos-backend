import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('resistance_type')
export class ResistanceType {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    resistanceType: string;

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
        this.resistanceType = this.resistanceType.toLocaleUpperCase().trim();
    }
}
