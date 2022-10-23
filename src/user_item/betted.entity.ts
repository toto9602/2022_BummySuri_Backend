import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from '../item/item.entity';
import { User } from '../users/user.entity';

@Entity()
export class Betted {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.bettedItems)
  user: User;

  @ManyToOne(() => Item, (item) => item.bettedUsers)
  item: Item;
}
