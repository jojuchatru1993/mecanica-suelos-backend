import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('standard')
export class Standard {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    standard: string;

    @Column('text', {
        nullable: true
    })
    description?: string;

    @Column('text', {
        nullable: true
    })
    url?: string

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
        this.standard = this.standard.toLocaleUpperCase().trim();
    }
}
