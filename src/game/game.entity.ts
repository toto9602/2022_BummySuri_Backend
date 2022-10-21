import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class GameGuess {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  baseballWin: string;

  @Column()
  baseballGap: string;

  @Column()
  iceHockeyWin: string;

  @Column()
  iceHockeyGap: string;

  @Column()
  basketballWin: string;

  @Column()
  basketballGap: string;

  @Column()
  rugbyWin: string;

  @Column()
  rugbyGap: string;

  @Column()
  soccerWin: string;

  @Column()
  soccerGap: string;

  @OneToOne(() => User, (user) => user.gameGuess, { cascade: true })
  user: User;
}
