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

export class MintRes extends BaseRes {
  character: string;
  metadata: MetaData;
  username: string;
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

export class KoreaMintCountRes extends BaseRes {
  koreaMints: number;
}

export class YonseiMintCountRes extends BaseRes {
  yonseiMints: number;
}

export interface Attribute {
  trait_type: string;
  value: string;
}

export interface MetaData {
  name: string;
  description: string;
  image: string;
  background_color: string;
  sendable: boolean;
  send_friendly_only: boolean;
  attributes: Attribute[];
}
export class GetNextNFTMetaDataRes extends BaseRes {
  character: string;
  metadata: MetaData;
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
    description: '점수 차 예측 ("0", "1", "2", "3")',
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

export class saveBettedItemReq {
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
    description: '아이템의 코드 ("1" || "2" || "3" || "4" || "5")',
  })
  @IsString()
  itemCode: string;
}

export class saveBettedItemDto {
  userAddr: string;
  itemCode: string;
}

export class Bettings {
  @ApiProperty({
    type: Number,
    required: true,
    description: '1등 아이템 응모 수량',
  })
  '1': number;

  @ApiProperty({
    type: Number,
    required: true,
    description: '2등 아이템 응모 수량',
  })
  '2': number;

  @ApiProperty({
    type: Number,
    required: true,
    description: '3등 아이템 응모 수량',
  })
  '3': number;

  @ApiProperty({
    type: Number,
    required: true,
    description: '4등 아이템 응모 수량',
  })
  '4': number;

  @ApiProperty({
    type: Number,
    required: true,
    description: '5등 아이템 응모 수량',
  })
  '5': number;
}
export class GetBettingsCountRes extends BaseRes {
  @ApiProperty({
    type: Bettings,
    required: true,
    description: '아이템별 응모 수량',
  })
  @ValidateNested()
  bettings: Bettings;
}
