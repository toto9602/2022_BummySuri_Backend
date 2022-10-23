import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GameGuess } from '../game/game.entity';

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

  @Column({ default: 0 })
  points: number;

  @OneToOne(() => GameGuess, (gameGuess) => gameGuess.user)
  gameGuess: GameGuess;
}
