import { Client } from '../../client/entities/client.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('proyect')
export class Proyect {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column('text', { nullable: true })
  observation?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Client, (client) => client.proyects, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'clientId' })
  client: Client;

  @BeforeInsert()
  @BeforeUpdate()
  sanitizeFields() {
    this.name = this.name?.toLocaleUpperCase().trim();
    this.description = this.description?.toLocaleUpperCase().trim();
    this.observation = this.observation?.toLocaleUpperCase().trim();
  }
}
