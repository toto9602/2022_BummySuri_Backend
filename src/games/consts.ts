import { GameChoices } from './game.dtos';

export const GAME_CHOICES: GameChoices[] = ['LEFT', 'RIGHT'];

export enum GameResults {
  WIN = 'WIN',
  LOSE = 'LOSE',
}
