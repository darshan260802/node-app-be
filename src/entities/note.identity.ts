import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Note {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({default: false})
    isComplete?: boolean;

    @CreateDateColumn()
    createdAt?: Date;

    @Column({select: false})
    userId: string;

}