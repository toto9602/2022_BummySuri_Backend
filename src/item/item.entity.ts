import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Betted } from '../user_item/betted.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  itemCode: string;

  @Column()
  pointsNeeded: number;

  @OneToMany((type) => Betted, (betted) => betted.item)
  bettedUsers: User[];
}
