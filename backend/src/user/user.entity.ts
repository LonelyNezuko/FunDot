import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string

    @CreateDateColumn({ default: () => "'0000-00-00 00:00:00'" })
    createdDate: Date;

    // @BeforeInsert()
    // insertCreated() {
    //     this.createdDate = new Date();
    // }
}