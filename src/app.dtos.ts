import { IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsAddress } from './dtos.validation';

export class MintReq {
  @ApiProperty({
    type: String,
    required: true,
    description: '사용자의 주소',
  })
  @IsAddress()
  userAddr: string;

  @ApiProperty({
    type: String,
    required: true,
    description: '사용자의 이름',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    description: "사용자의 소속 대학 ('Korea' 혹은 'Yonsei')",
  })
  @IsString()
  univ: string;

  @ApiProperty({
    type: String,
    required: true,
    description: '사용자의 전화번호',
  })
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    type: String,
    required: true,
    description: '사용자의 전공',
  })
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

export class BaseRes {
  @ApiProperty({
    type: String,
    required: true,
    description: '결과 코드 (성공시 "0")',
  })
  resultCode: string;

  @ApiProperty({
    type: String,
    required: true,
    description: '결과 메시지(성공시 "success")',
  })
  message: string;
}

export class MintCountRes extends BaseRes {
  @ApiProperty({
    type: Number,
    required: true,
    description: '고려대 민팅 수량 ',
  })
  korea: number;

  @ApiProperty({
    type: Number,
    required: true,
    description: '연세대 민팅 수량',
  })
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
