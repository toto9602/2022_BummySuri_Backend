import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GameGuess } from '../game/game.entity';
import { Item } from '../item/item.entity';
import { Betted } from '../user_item/betted.entity';

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
  univ: boolean;

  @Column()
  phoneNumber: string;

  @Column()
  studentNumber: string;

  @Column({ default: 500 }) // 기본 점수 500
  points: number;

  @Column()
  myMetadataNum: string;

  @OneToOne(() => GameGuess, (gameGuess) => gameGuess.user)
  gameGuess: GameGuess;

  @OneToMany((type) => Betted, (betted) => betted.user)
  bettedItems: Betted[];
}
