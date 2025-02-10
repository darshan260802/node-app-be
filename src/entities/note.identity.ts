import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Note {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    isComplete: boolean;

    @CreateDateColumn()
    createdAt?: Date;

    @Column()
    userId: string;

}