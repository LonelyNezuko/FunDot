import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class News {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_id: number

    @CreateDateColumn()
    createAt: Date

    @CreateDateColumn({ onUpdate: "CURRENT_TIMESTAMP(6)" })
    updateAt: Date

    @Column({ default: '' })
    tags: string

    @Column('simple-json', { default: JSON.stringify({ text: '', attached: [] }) })
    body: object

    // feedback
    @Column('simple-json', { default: JSON.stringify([]) })
    likes: string[]

    @Column('simple-json', { default: JSON.stringify([]) })
    dislikes: string[]

    @Column('simple-json', { default: JSON.stringify([]) })
    shares: string[]

    @Column('simple-json', { default: JSON.stringify([]) })
    views: string[]
    // 

    @Column({ default: false })
    ageLimit: boolean

    // только для автора
    @Column({ default: false })
    isPin: boolean

    @Column({ default: true })
    isNotify: boolean
    // 

    @Column({ default: 'public' })
    access: string

    @Column('simple-json', { default: JSON.stringify([]) })
    comments: string[]
}