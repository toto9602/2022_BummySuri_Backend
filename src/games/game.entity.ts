import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class GameResult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  game: string;

  @Column()
  scoreGap: string;

  @ManyToOne((type) => User, (user) => user.games)
  user: User;
}
