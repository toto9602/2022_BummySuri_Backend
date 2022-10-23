import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  itemCode: string;

  @Column()
  pointsNeeded: number;

  @OneToMany(() => User, (user) => user.bettedItem)
  bettedUsers: User[];
}
