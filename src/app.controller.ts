import { Controller, Post } from '@nestjs/common';
import { MintReq } from './app.dtos';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/mint')
  singleMint(req: MintReq): string {
    const reqDto = Object.assign({}, req);
    return this.appService.singleMint(req);
  }
}
