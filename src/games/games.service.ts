import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { GameResults, GAME_CHOICES } from './consts';
import { GameChoices } from './games.dtos';

@Injectable()
export class GamesService {
  constructor(private usersService: UsersService) {}

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
