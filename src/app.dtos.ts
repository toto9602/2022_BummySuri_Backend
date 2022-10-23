import { IsBoolean, IsString, ValidateNested } from 'class-validator';
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
    type: Boolean,
    required: true,
    description: '사용자의 소속 대학 (true 혹은 false)',
  })
  @IsBoolean()
  univ: boolean;

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
    description: '사용자의 학번',
  })
  @IsString()
  studentNumber: string;
}

export class MintDto {
  userAddr: string;
  name: string;
  univ: boolean;
  phoneNumber: string;
  studentNumber: string;
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

export class GameGuess {
  @ApiProperty({
    type: String,
    required: true,
    description: '승리할 학교 예측 ("Korea" || "Yonsei" || "None")',
  })
  @IsString()
  univWin: string;

  @ApiProperty({
    type: String,
    required: true,
    description: '점수 차 예측',
  })
  @IsString()
  scoreGap: string;
}

export class GameGuessReq {
  @ApiProperty({
    type: String,
    required: true,
    description: '사용자 주소',
  })
  @IsAddress()
  userAddr: string;

  @ApiProperty({
    type: GameGuess,
    required: true,
    description: '농구 결과 예측',
  })
  @ValidateNested()
  baseball: GameGuess;

  @ApiProperty({
    type: GameGuess,
    required: true,
    description: '빙구 결과 예측',
  })
  @ValidateNested()
  iceHockey: GameGuess;

  @ApiProperty({
    type: GameGuess,
    required: true,
    description: '농구 결과 예측',
  })
  @ValidateNested()
  basketball: GameGuess;

  @ApiProperty({
    type: GameGuess,
    required: true,
    description: '럭비 결과 예측',
  })
  @ValidateNested()
  rugby: GameGuess;

  @ApiProperty({
    type: GameGuess,
    required: true,
    description: '축구 결과 예측',
  })
  @ValidateNested()
  soccer: GameGuess;
}

export class GameGuessDto {
  userAddr: string;
  baseball: GameGuess;
  iceHockey: GameGuess;
  basketball: GameGuess;
  rugby: GameGuess;
  soccer: GameGuess;
}
