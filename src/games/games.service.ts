import { Injectable } from '@nestjs/common';

import { UsersServiceImpl } from 'src/users/users.service';

import { GameResults, GAME_CHOICES } from './consts';
import { GameChoices } from './games.dtos';

interface GamesService {
  createGameResult(gameChoice: GameChoices): GameResults;
}

@Injectable()
export class GamesServiceImpl implements GamesService {
  constructor(private usersService: UsersServiceImpl) {}

  createGameResult(gameChoice: GameChoices): GameResults {
    const randomResult = this.generateRandomResult();

    if (randomResult == gameChoice) return GameResults.WIN;

    return GameResults.LOSE;
  }

  private generateRandomResult(): GameChoices {
    const randomResult =
      GAME_CHOICES[Math.floor(Math.random() * GAME_CHOICES.length)];

    return randomResult;
  }
}
