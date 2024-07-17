import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DocumentType } from '../../document-type/entities/document-type.entity';
import { Proyect } from '../../proyect/entities/proyect.entity';

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
    unique: true,
  })
  documentNumber: string;

  @Column('text', { nullable: true })
  email?: string;

  @Column('text', { nullable: true })
  phone?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => DocumentType, (documentType) => documentType.clients, {
    eager: true,
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'documentTypeId' })
  documentType: DocumentType;

  @OneToMany(() => Proyect, (proyect) => proyect.client)
  proyects?: Proyect[];

  @BeforeInsert()
  @BeforeUpdate()
  sanitizeFields() {
    this.firstName = this.firstName?.toLocaleUpperCase().trim();
    this.lastName = this.lastName?.toLocaleUpperCase().trim();
    this.businessName = this.businessName?.toLocaleUpperCase().trim();
    this.email = this.email?.toLowerCase().trim();
  }
}
