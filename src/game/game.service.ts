import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GameGuess } from './game.entity';
import { BaseRes, GameGuessDto } from '../app.dtos';
import { UsersServiceImpl } from '../users/users.service';

interface GameService {
  // saveGameGuess(req: GuessGameResultParams): Promise<BaseRes>;
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

      console.log('user', user);
      const savedGameGuess = this.gameRepository.create({
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
      });

      console.log('savedGameGuess', savedGameGuess);

      await this.gameRepository.save(savedGameGuess);
      return savedGameGuess;
    } catch (err: any) {
      const msg = err.message || '';
      throw new InternalServerErrorException(msg);
    }
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
