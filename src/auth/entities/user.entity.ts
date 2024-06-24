import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Exclude } from "class-transformer";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    email: string;

    @Column('text', {
        select: false
    })
    @Exclude()
    password: string;

    @Column('text')
    firstName: string;

    @Column('text')
    lastName: string;

    @Column('text', {
        array: true,
        default: ['user']
    })
    roles: string[];

    @Column('bool', {
        default: true
    })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
    sanitizeFields() {
        this.email = this.email.toLowerCase().trim();
        this.firstName = this.firstName.toLocaleUpperCase();
        this.lastName = this.lastName.toLocaleUpperCase();
    }

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            const saltRounds = 10;
            this.password = await bcrypt.hash(this.password, saltRounds);
        }
    }
}
