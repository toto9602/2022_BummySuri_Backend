import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import {
  BaseRes,
  GameGuessDto,
  GameGuessReq,
  GetBettingsCountRes,
  GetMyMetadataReq,
  GetMyMetadataRes,
  GetMyPointsDto,
  GetMyPointsReq,
  GetMyPointsRes,
  MintCountRes,
  MintDto,
  MintReq,
  MintRes,
  saveBettedItemDto,
  saveBettedItemReq,
} from './app.dtos';
import { AppService } from './app.service';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/mint')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '사용자 주소로 minting' })
  @ApiOkResponse({
    description: '컨트랙 함수 호출하여 minting 후 성공했음을 알리는 응답 반환 ',
    type: BaseRes,
  })
  async singleMint(@Body() req: MintReq): Promise<MintRes> {
    const reqDto = Object.assign(new MintDto(), req);
    return this.appService.singleMint(reqDto);
  }

  @Get('/counts')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '고대 & 연대 minting 수량 반환' })
  @ApiOkResponse({
    description: '컨트랙에서 고대와 연대 민팅 수량 조회하여 반환',
    type: MintCountRes,
  })
  async getMintCounts(): Promise<MintCountRes> {
    return this.appService.getMintCounts();
  }

  @Post('/guess')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '사용자의 게임 결과 예측 정보 저장' })
  @ApiOkResponse({
    description: '게임 결과 예측 정보를 저장 후 성공했음을 알리는 응답 반환',
    type: BaseRes,
  })
  async guessGame(@Body() req: GameGuessReq): Promise<BaseRes> {
    const reqDto = Object.assign(new GameGuessDto(), req);
    return this.appService.guessGame(reqDto);
  }

  @Post('/bet')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '아이템 응모하기' })
  @ApiOkResponse({
    description:
      '사용자의 응모 정보를 DB에 저장 후 성공했음을 알리는 응답 반환',
    type: BaseRes,
  })
  async saveBettedItemInfo(@Body() req: saveBettedItemReq): Promise<BaseRes> {
    const reqDto = Object.assign(new saveBettedItemDto(), req);
    return this.appService.saveBettedItemInfo(reqDto);
  }

  @Get('/bettings')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '아이템별 응모 수량' })
  @ApiOkResponse({
    description: '아이템별로 응모한 사용자 수를 반환',
    type: GetBettingsCountRes,
  })
  async getBettingsCount(): Promise<GetBettingsCountRes> {
    return this.appService.getBettingsCount();
  }

  @Post('/myPoints')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '사용자의 포인트' })
  @ApiOkResponse({
    description: '사용자가 현재 보유한 포인트를 반환',
    type: GetMyPointsRes,
  })
  async getMyPoints(@Body() req: GetMyPointsReq): Promise<GetMyPointsRes> {
    const reqDto = Object.assign(new GetMyPointsDto(), req);
    return this.appService.getMyPoints(reqDto);
  }

  // @Post('/myMeta')
  // @HttpCode(HttpStatus.OK)
  // @ApiOperation({summary:"나의 NFT 메타데이터"})
  // @ApiOkResponse({
  //   description:"minting 한 사용자가 받은 NFT 메타데이터를 반환",
  //   type:
  // })
  // async getMyMetadata(@Body() req:GetMyMetadataReq):Promise<GetMyMetadataRes> {}

  @Post('/update')
  async updateMetaData() {
    return this.appService.updateMetaData();
  }
}
