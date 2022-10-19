import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GameResult } from '../games/game.entity';

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

  @OneToMany((type) => GameResult, (gameResult) => gameResult.user)
  games: GameResult[];
}
