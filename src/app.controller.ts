import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  BaseRes,
  GuessGameResultParams,
  GuessGameResultReq,
  MintCountRes,
  MintDto,
  MintReq,
} from './app.dtos';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/mint')
  async singleMint(@Body() req: MintReq): Promise<BaseRes> {
    const reqDto = Object.assign(new MintDto(), req);
    return this.appService.singleMint(reqDto);
  }

  @Get('/counts')
  async getMintCount(): Promise<MintCountRes> {
    return this.appService.getMintCount();
  }

  // async guessGameResult(@Body() req: GuessGameResultReq): Promise<BaseRes> {
  // const reqDto = Object.assign(new GuessGameResultParams(), req);
  // return this.appService.guessGameResult(reqDto);
  // }
}
