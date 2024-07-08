import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DocumentType } from "../../document-type/entities/document-type.entity";

@Entity('client')
export class Client {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { nullable: true })
    firstName?: string;

    @Column('text', { nullable: true })
    lastName?: string;

    @Column('text', { nullable: true })
    businessName?: string;

    @Column('text', {
        unique: true
    })
    documentNumber: string;

    @Column('text')
    email: string;

    @Column('text')
    phone: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(
        () => DocumentType,
        (documentType) => documentType.clients,
        {   onDelete: 'CASCADE',
            nullable: false
        }
    )
    @JoinColumn({ name: 'documentTypeId' })
    documentType: DocumentType;

    @BeforeInsert()
    @BeforeUpdate()
    sanitizeFields() {
        this.firstName = this.firstName?.toLocaleUpperCase().trim();
        this.lastName = this.lastName?.toLocaleUpperCase().trim();
        this.businessName = this.businessName?.toLocaleUpperCase().trim();
        this.email = this.email?.toLowerCase().trim();
    }
}
