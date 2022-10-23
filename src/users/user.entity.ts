import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GameGuess } from '../game/game.entity';
import { Item } from '../item/item.entity';

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
  studentNumber: string;

  @Column({ default: 500 }) // 기본 점수 500
  points: number;

  @OneToOne(() => GameGuess, (gameGuess) => gameGuess.user)
  gameGuess: GameGuess;

  @ManyToOne(() => Item, (item) => item.bettedUsers)
  @JoinColumn({ name: 'betted_item_id' })
  bettedItem: Item;
}
