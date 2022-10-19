import { IsString, ValidateNested } from 'class-validator';
import { IsAddress } from './dtos.validation';

export class MintReq {
  @IsAddress()
  userAddr: string;

  @IsString()
  name: string;

  @IsString()
  univ: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  major: string;
}

export class MintDto {
  userAddr: string;
  name: string;
  univ: string;
  phoneNumber: string;
  major: string;
}

export interface BaseRes {
  resultCode: string;
  message: string;
}

export interface MintCountRes extends BaseRes {
  korea: number;
  yonsei: number;
}

export class GameResult {
  @IsString()
  univWin: string;

  @IsString()
  scoreGap: string;
}

export class GuessGameResultReq {
  @IsAddress()
  userAddr: string;

  @ValidateNested()
  gameOne: GameResult;

  @ValidateNested()
  gameTwo: GameResult;

  @ValidateNested()
  gameThree: GameResult;

  @ValidateNested()
  gameFour: GameResult;

  @ValidateNested()
  gameFive: GameResult;
}

export class GuessGameResultParams {
  userAddr: string;
  gameOne: GameResult;
  gameTwo: GameResult;
  gameThree: GameResult;
  gameFour: GameResult;
  gameFive: GameResult;
}

// export interface GameResultList {
//   gameOne: GameResult;
//   gameTwo: GameResult;
//   gameThree: GameResult;
//   gameFour: GameResult;
//   gameFive: GameResult;
// }

// export interface GuessGameResultParams {
//   userAddr: string;
//   gameResults: GameResultList;
// }
