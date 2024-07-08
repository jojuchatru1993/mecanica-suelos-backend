import { Client } from "../../client/entities/client.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('document_type')
export class DocumentType {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    documentType: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(
        () => Client,
        (client) => client.documentType
    )
    clients?: Client[];

    @BeforeInsert()
    @BeforeUpdate()
    sanitizeFields() {
        this.documentType = this.documentType.toLocaleUpperCase().trim();
    }
}
