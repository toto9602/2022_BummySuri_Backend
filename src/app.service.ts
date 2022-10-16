import { BadRequestException } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MintDto } from './app.dtos';
import { CaverServiceImpl } from './common/caver/caver.service';
import EthersUtil from './common/utils/ethers/ethers.utils';
import { UsersServiceImpl } from './users/users.service';

@Injectable()
export class AppService {
  constructor(
    private usersService: UsersServiceImpl,
    private caverService: CaverServiceImpl,
    private config: ConfigService,
  ) {}

  async singleMint(req: MintDto): Promise<boolean> {
    try {
      const alreadySucceeded = await this.usersService.checkIfSucceeded(
        req.userAddr,
      );

      if (alreadySucceeded)
        throw new BadRequestException(
          `User with ${req.userAddr} already Succeeded`,
        );

      // call singleMint
      const fn: Contract.FunctionName = 'singleMint';
      const { userAddr } = req;

      const input = EthersUtil.encodeFunctionData(fn, [userAddr]);

      const resultData = await this.caverService.call(
        this.config.get('ADDR'),
        input,
      );
      const result = EthersUtil.decodeFunctionResult(fn, resultData);

      return true;
    } catch (err: any) {
      if (err instanceof HttpException) throw err;
      const msg = err.message || '';
      throw new InternalServerErrorException(err.message);
    }
  }
}
