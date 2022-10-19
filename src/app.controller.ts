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
  GuessGameResultParams,
  GuessGameResultReq,
  MintCountRes,
  MintDto,
  MintReq,
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
  async singleMint(@Body() req: MintReq): Promise<BaseRes> {
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
  async getMintCount(): Promise<MintCountRes> {
    return this.appService.getMintCount();
  }

  // async guessGameResult(@Body() req: GuessGameResultReq): Promise<BaseRes> {
  // const reqDto = Object.assign(new GuessGameResultParams(), req);
  // return this.appService.guessGameResult(reqDto);
  // }
}
