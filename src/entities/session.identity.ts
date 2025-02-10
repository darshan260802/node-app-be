import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Session {
  @PrimaryColumn({ primary: true , unique: true})
  ipToken: string;

  @Column({ primary: true })
  userId: string;

  @Column()
  email: string;

  @CreateDateColumn()
  loginTime?: Date;
}
