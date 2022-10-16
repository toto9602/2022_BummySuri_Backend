import { Controller, Post } from '@nestjs/common';
import { MintReq } from './app.dtos';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/mint')
  async singleMint(req: MintReq): Promise<boolean> {
    const reqDto = Object.assign({}, req);
    return this.appService.singleMint(reqDto);
  }
}
