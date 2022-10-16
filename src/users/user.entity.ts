import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userAddr: string;

  @Column({ default: false })
  isSuccess: boolean;

  @Column()
  name: string;

  @Column()
  univ: string;

  @Column()
  phoneNumber: string;

  @Column()
  major: string;

  @Column({ default: 0 })
  points: number;
}
