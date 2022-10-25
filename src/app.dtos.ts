import { IsBoolean, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsAddress } from './dtos.validation';
import { MetadataAlreadyExistsError } from 'typeorm';

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

export class Attribute {
  @ApiProperty({
    type: String,
    required: true,
  })
  trait_type: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  value: string;
}

export class MetaData {
  @ApiProperty({
    type: String,
    required: true,
  })
  name: string;
  @ApiProperty({
    type: String,
    required: true,
  })
  description: string;
  @ApiProperty({
    type: String,
    required: true,
  })
  image: string;
  @ApiProperty({
    type: String,
    required: true,
  })
  background_color: string;
  @ApiProperty({
    type: Boolean,
    required: true,
  })
  sendable: boolean;
  @ApiProperty({
    type: Boolean,
    required: true,
  })
  send_friendly_only: boolean;
  @ApiProperty({
    type: [Attribute],
    required: true,
  })
  attributes: Attribute[];
}

export class MintRes extends BaseRes {
  @ApiProperty({
    type: String,
    required: true,
    description: '버미 || 수리',
  })
  character: string;

  @ApiProperty({
    type: MetaData,
    required: true,
    description: 'NFT 메타데이터',
  })
  metadata: MetaData;

  @ApiProperty({
    type: String,
    required: true,
    description: '사용자의 이름',
  })
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

export class GetNextNFTMetaDataRes extends BaseRes {
  character: string;
  metadata: MetaData;
  metadataNum: string;
}

export class GameGuess {
  @ApiProperty({
    type: String,
    required: true,
    description: '승리할 학교 예측 ("KOREA" || "YONSEI" || "TIE")',
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

export class GetMyPointsReq {
  @IsAddress()
  userAddr: string;
}

export class GetMyPointsDto {
  userAddr: string;
}

export class GetMyPointsRes extends BaseRes {
  @ApiProperty({
    type: Number,
    required: true,
    description: '사용자의 현재 points',
  })
  points: number;
}

export class GetMyMetadataReq {
  @ApiProperty({
    type: String,
    required: true,
    description: '사용자의 주소',
  })
  @IsAddress()
  userAddr: string;
}

export class GetMyMetadataDto {
  userAddr: string;
}
export class GetMyMetadataRes extends BaseRes {
  @ApiProperty({
    type: MetaData,
  })
  metadata: MetaData;

  @ApiProperty({
    type: String,
    required: true,
  })
  userAddr: string;
}

export class CalculatePointsReq {
  @ApiProperty({
    type: String,
    description: "Day 1 || Day 2 ('1' 또는 '2')",
  })
  day: string;
}

export class IsMintedReq {
  @ApiProperty({
    type: String,
    description: '사용자의 주소',
  })
  userAddr: string;
}

export class IsMintedDto {
  userAddr: string;
}

export class IsMintedRes extends BaseRes {
  @ApiProperty({
    type: Boolean,
    description: 'minting을 이미 하였는지 여부',
  })
  isMinted: boolean;
}
