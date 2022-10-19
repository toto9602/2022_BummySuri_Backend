import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GameResults, GAME_CHOICES } from './consts';
import { GameResult } from './game.entity';
import { GameChoices } from './game.dtos';
import { BaseRes, GuessGameResultParams } from '../app.dtos';

interface GameService {
  // saveGameGuess(req: GuessGameResultParams): Promise<BaseRes>;
}

@Injectable()
export class GameServiceImpl implements GameService {
  constructor(
    @InjectRepository(GameResult)
    private gameRepository: Repository<GameResult>,
  ) {}

  // async saveGameGuess(req: GuessGameResultParams): Promise<> {
  // const savedGameGuess = this.gameRepository.create
  // game:req.
  //
  // })
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
// }
