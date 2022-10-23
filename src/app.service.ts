import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { TransactionReceipt } from 'caver-js';

import { BaseRes, GameGuessDto, MintCountRes, MintDto } from './app.dtos';
import { ContractFactory, University } from './common/caver/caver.factory';
import { UsersServiceImpl } from './users/users.service';
import { GameServiceImpl } from './game/game.service';

const LOOP_TIME = 3000;

@Injectable()
export class AppService {
  private contractFactory: ContractFactory;
  constructor(
    private usersService: UsersServiceImpl,
    private gameService: GameServiceImpl,
    private config: ConfigService,
    private http: HttpService,
  ) {
    this.contractFactory = new ContractFactory();
  }

  async singleMint(req: MintDto): Promise<BaseRes> {
    try {
      let user = await this.usersService.getUserByAddr(req.userAddr);
      // 이미 DB에 저장된 user이면 isSuccess 확인
      if (user) {
        const alreadySucceeded = await this.usersService.checkIfSucceeded(
          user.userAddr,
        );

        if (alreadySucceeded)
          throw new BadRequestException(
            `User with addr ${user.userAddr} already Succeeded`,
          );
      }

      // DB에 존재하지 않는 user이면 DB에 저장
      if (user == null) {
        user = await this.usersService.createUser(req);
      }

      const univType = this.getUnivType(req.univ);
      const contract = this.contractFactory.get(univType);
      const receipt = await contract.methods.singleMint(req.userAddr).send({
        from: this.config.get('DEPLOYER_ACCOUNT'),
        gas: 250000,
      });

      if (receipt.status === true) {
        await this.usersService.markAsSucceeded(user.userAddr);

        return {
          resultCode: '0',
          message: 'success',
        };
      }

      throw new InternalServerErrorException('Minting Failed');
    } catch (err: any) {
      if (err instanceof HttpException) throw err;
      const msg = err.message || '';
      throw new InternalServerErrorException(err.message);
    }
  }

  async getMintCount(): Promise<MintCountRes> {
    try {
      const koreaContract = this.contractFactory.get('KOREA');
      const yonseiContract = this.contractFactory.get('YONSEI');

      const koreaResult = await koreaContract.call(
        { from: this.config.get('DEPLOYER_ACCOUNT') },
        'totalSupply',
      );

      const yonseiResult = await yonseiContract.call(
        { from: this.config.get('DEPLOYER_ACCOUNT') },
        'totalSupply',
      );

      if (koreaResult && yonseiResult)
        return {
          resultCode: '0',
          message: 'success',
          korea: koreaResult,
          yonsei: yonseiResult,
        };

      throw new InternalServerErrorException('Fetching mint counts failed');
    } catch (err: any) {
      throw err;
    }
  }
  async guessGame(req: GameGuessDto): Promise<BaseRes> {
    const savedGameGuess = await this.gameService.saveGameGuess(req);

    if (savedGameGuess) return { resultCode: '0', message: 'success' };

    throw new InternalServerErrorException('Saving game Guess Failed');
  }

  // TODO : loop 추가하기
  async updateMetaData(): Promise<void> {
    const beginNum: Number = 1;
    let hex = beginNum.toString(16);
    hex = '0x' + hex;
    const result = await lastValueFrom(
      this.http.put(
        `https://th-api.klaytnapi.com/v2/contract/nft/${process.env.NFT_ADDRESS}/token/${hex}/metadata`,
        '',
        {
          auth: { username: process.env.ID, password: process.env.PW },
          headers: { 'x-chain-id': process.env.X_CHAIN_ID },
        },
      ),
    );
  }

  private getUnivType(univ: boolean): University {
    if (univ === true) return 'KOREA';
    if (univ === false) return 'YONSEI';
  }
}
