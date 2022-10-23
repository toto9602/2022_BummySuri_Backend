import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GameGuess } from './game.entity';
import { GameGuessDto } from '../app.dtos';
import { UsersServiceImpl } from '../users/users.service';

interface GameService {
  saveGameGuess(req: GameGuessDto): Promise<GameGuess>;
}

@Injectable()
export class GameServiceImpl implements GameService {
  constructor(
    @InjectRepository(GameGuess)
    private gameRepository: Repository<GameGuess>,
    private usersService: UsersServiceImpl,
  ) {}

  async saveGameGuess(req: GameGuessDto): Promise<GameGuess> {
    try {
      const user = await this.usersService.getUserByAddr(req.userAddr);

      const newGameGuess = this.gameRepository.create({
        baseballWin: req.baseball.univWin,
        baseballGap: req.baseball.scoreGap,
        iceHockeyWin: req.iceHockey.univWin,
        iceHockeyGap: req.iceHockey.scoreGap,
        basketballWin: req.basketball.univWin,
        basketballGap: req.basketball.scoreGap,
        rugbyWin: req.rugby.univWin,
        rugbyGap: req.rugby.scoreGap,
        soccerWin: req.soccer.univWin,
        soccerGap: req.soccer.scoreGap,
        user: user,
      });

      await this.gameRepository.save(newGameGuess);
      return newGameGuess;
    } catch (err: any) {
      const msg = err.message || '';
      throw new InternalServerErrorException(msg);
    }
  }

  private async findGameGuessByUserAddr(userAddr: string): Promise<GameGuess> {
    const user = await this.usersService.getUserByAddr(userAddr);

    const game = await this.gameRepository.findOneBy({ user: user });

    return game;
  }
}
// createGameResult(gameChoice: GameChoices): GameResults {
//   const randomResult = this.generateRandomResult();

//   if (randomResult == gameChoice) return GameResults.WIN;

//   return GameResults.LOSE;
// }

// private generateRandomResult(): GameChoices {
//   const randomResult =
//     GAME_CHOICES[Math.floor(Math.random() * GAME_CHOICES.length)];

//   return randomResult;
// }
