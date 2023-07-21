import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({ default: null })
    promo: string

    @CreateDateColumn()
    createdDate: Date

    @Column({})
    regIP: string

    @Column({ default: '' })
    link: string

    @Column({ default: false })
    isVerified: boolean

    @Column({ default: false })
    isBot: boolean

    @Column('simple-json', { default: JSON.stringify({ image: '/assets/avatars/default.png', size: 100, position: { x: 0, y: 0 } }) })
    avatar: object

    @Column('simple-json', { default: JSON.stringify({ image: '', size: 100, position: { x: 0, y: 0 } }) })
    background: object

    @Column('simple-json', { default: JSON.stringify({ type: '' }) })
    status: object

    @Column('simple-json', { default: JSON.stringify({ teamid: -1, team: {} }) })
    isInTeam: object

    @Column({ default: 500 })
    rpp: number

    @Column({ default: 0 })
    matches: number

    @Column()
    country: string

    @Column({ type: 'text', default: '' })
    about: string

    @Column({ default: '' })
    signature: string

    @CreateDateColumn()
    online: Date
}