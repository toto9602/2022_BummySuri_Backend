import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { HttpException, Logger } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

import {
  BaseRes,
  GameGuessDto,
  GetBettingsCountRes,
  saveBettedItemDto,
  GetNextNFTMetaDataRes,
  KoreaMintCountRes,
  MintCountRes,
  MintDto,
  MintRes,
  YonseiMintCountRes,
  GetMyPointsDto,
  GetMyPointsRes,
  GetMyMetadataDto,
  GetMyMetadataRes,
  MetaData,
  CalculatePointsReq,
} from './app.dtos';
import { ContractFactory, University } from './common/caver/caver.factory';
import { UsersServiceImpl } from './users/users.service';
import { GameServiceImpl } from './game/game.service';
import { ItemServiceImpl } from './item/item.service';

const LOOP_TIME = 3000;

@Injectable()
export class AppService {
  private contractFactory: ContractFactory;
  private readonly logger = new Logger();

  constructor(
    private usersService: UsersServiceImpl,
    private gameService: GameServiceImpl,
    private itemService: ItemServiceImpl,
    private config: ConfigService,
    private http: HttpService,
  ) {
    this.contractFactory = new ContractFactory();
  }

  async singleMint(req: MintDto): Promise<MintRes> {
    try {
      let user = await this.usersService.getUserByAddr(req.userAddr);
      // 이미 DB에 저장된 user이면 isSuccess 확인
      if (user) {
        const alreadySucceeded = await this.usersService.checkIfSucceeded(
          user.userAddr,
        );

        if (alreadySucceeded) {
          this.logger.warn(`User with addr ${user.userAddr} already Succeeded`);
          throw new BadRequestException(
            `User with addr ${user.userAddr} already Succeeded`,
          );
        }
      }

      // DB에 존재하지 않는 user이면 DB에 저장
      if (user == null) {
        user = await this.usersService.createUser(req);
        this.logger.log('User Created');
      }

      const univType = this.getUnivType(req.univ);
      const contract = this.contractFactory.get(univType);
      const receipt = await contract.methods.singleMint(req.userAddr).send({
        from: this.config.get('DEPLOYER_ACCOUNT'),
        gas: 250000,
      });
      if (receipt.status === true) {
        this.logger.log('Mint Success!!');
        // await this.usersService.markAsSucceeded(user.userAddr);
        const nftData = await this.getNextNFTMetaData(univType);

        user.isSuccess = true;
        user.myMetadataNum = nftData.metadataNum;

        const userSaved = await this.usersService.saveUser(user);
        this.logger.log(`User with addr ${user.userAddr} set To True`);
        if (nftData.resultCode == '0' && userSaved) {
          return {
            resultCode: '0',
            message: 'success',
            username: user.name,
            character: nftData.character,
            metadata: nftData.metadata,
          };
        }
      }

      throw new InternalServerErrorException('Minting Failed');
    } catch (err: any) {
      this.logger.error(err.message);
      if (err instanceof HttpException) throw err;
      const msg = err.message || '';
      throw new InternalServerErrorException(err.message);
    }
  }

  async getMintCounts(): Promise<MintCountRes> {
    try {
      const koreaResult = await this.getKoreaMintCount();
      const yonseiResult = await this.getYonseiMintCount();

      if (koreaResult.resultCode == '0' && yonseiResult.resultCode == '0') {
        this.logger.log('Mint Counts Returned');
        return {
          resultCode: '0',
          message: 'success',
          korea: koreaResult.koreaMints,
          yonsei: yonseiResult.yonseiMints,
        };
      }

      this.logger.error('Fetching mint counts failed');
      throw new InternalServerErrorException('Fetching mint counts failed');
    } catch (err: any) {
      throw err;
    }
  }

  async guessGame(req: GameGuessDto): Promise<BaseRes> {
    const savedGameGuess = await this.gameService.saveGameGuess(req);

    if (savedGameGuess) {
      this.logger.log(`User ${req.userAddr} guess saved`);
      return { resultCode: '0', message: 'success' };
    }
    this.logger.error('Saving game guess Failed');
    throw new InternalServerErrorException('Saving game Guess Failed');
  }

  async getMyPoints(req: GetMyPointsDto): Promise<GetMyPointsRes> {
    const user = await this.usersService.getUserByAddr(req.userAddr);

    this.logger.log(`User ${req.userAddr} points Fetched`);
    return {
      resultCode: '0',
      message: 'success',
      points: user.points,
    };
  }

  async getMyMetadata(req: GetMyMetadataDto): Promise<GetMyMetadataRes> {
    const user = await this.usersService.getUserByAddr(req.userAddr);
    let metadata: MetaData;
    const univType = this.getUnivType(user.univ);

    metadata = await this.getMeta(univType, user.myMetadataNum);

    this.logger.log(`User ${req.userAddr} metadata fetched`);
    return {
      message: 'success',
      resultCode: '0',
      userAddr: req.userAddr,
      metadata: metadata,
    };
  }

  async redirectIfUser(userAddr: string) {
    const user = this.usersService.getUserByAddr(userAddr);

    if (user) {
      return { url: 'https://bummy-suri.com/myNFT' };
    }
    return { url: null };
  }

  private async getKoreaMintCount(): Promise<KoreaMintCountRes> {
    try {
      const koreaContract = this.contractFactory.get('KOREA');

      const koreaResult = await koreaContract.call(
        { from: this.config.get('DEPLOYER_ACCOUNT') },
        'totalSupply',
      );
      this.logger.log(`Korea MintCount Fetched : ${koreaResult}`);
      if (koreaResult)
        return {
          resultCode: '0',
          message: 'success',
          koreaMints: koreaResult,
        };

      throw new InternalServerErrorException(
        'Fetching Korea mint counts failed',
      );
    } catch (err: any) {
      throw err;
    }
  }

  private async getYonseiMintCount(): Promise<YonseiMintCountRes> {
    try {
      const yonseiContract = this.contractFactory.get('YONSEI');

      const yonseiResult = await yonseiContract.call(
        { from: this.config.get('DEPLOYER_ACCOUNT') },
        'totalSupply',
      );
      this.logger.log(`Yonsei MintCount Fetched :${yonseiResult}`);

      if (yonseiResult)
        return {
          resultCode: '0',
          message: 'success',
          yonseiMints: yonseiResult,
        };

      this.logger.error('Fetching Yonsei mint counts failed');
      throw new InternalServerErrorException('Fetching mint counts failed');
    } catch (err: any) {
      throw err;
    }
  }

  private async getNextNFTMetaData(
    univ: University,
  ): Promise<GetNextNFTMetaDataRes> {
    try {
      let url: string;
      let nextNum: string;
      let character: string;

      if (univ == 'KOREA') {
        character = '버미';
        url = this.config.get('BUMMY_URL');
        nextNum = (await this.getKoreaMintCount()).koreaMints.toString();
      }

      if (univ === 'YONSEI') {
        character = '수리';
        url = this.config.get('SURI_URL');
        nextNum = (await this.getYonseiMintCount()).yonseiMints.toString();
      }
      const requestUrl = url + nextNum + '.json';
      const metadata = (await lastValueFrom(this.http.get(requestUrl))).data;
      if (metadata) {
        return {
          resultCode: '0',
          message: 'success',
          metadataNum: nextNum,
          character: character,
          metadata: metadata,
        };
      }
    } catch (err: any) {
      this.logger.error('getting next metadata failed', err.message);
      const msg = err.message || '';
      throw new InternalServerErrorException(msg);
    }
  }

  private async getMeta(
    univ: University,
    myMetadataNum: string,
  ): Promise<MetaData> {
    try {
      let url: string;

      if (univ == 'KOREA') {
        url = this.config.get('BUMMY_URL') + myMetadataNum + '.json';
      }
      if (univ == 'YONSEI') {
        url = this.config.get('SURI_URL') + myMetadataNum + '.json';
      }

      const metadata = (await lastValueFrom(this.http.get(url))).data;

      return metadata;
    } catch (err: any) {
      this.logger.error(err.message);
      throw new InternalServerErrorException(err.message);
    }
  }

  async saveBettedItemInfo(req: saveBettedItemDto): Promise<BaseRes> {
    const savedBettedUser = await this.itemService.saveBettedItemInfo(req);

    if (savedBettedUser) {
      this.logger.log('User betted to Item');
      return { resultCode: '0', message: 'success' };
    }

    this.logger.error('Saving betted item failed');
    throw new InternalServerErrorException('Saving Betted Item Failed');
  }

  async getBettingsCount(): Promise<GetBettingsCountRes> {
    const result = await this.itemService.getBettingsCount();

    if (result) {
      this.logger.log('Bettings Count Fetched');
      return { resultCode: '0', message: 'success', bettings: result };
    }
    this.logger.error('Fetching Bettings count failed');
    throw new InternalServerErrorException('Fetching Bettings Count Failed');
  }

  private getUnivType(univ: boolean): University {
    if (univ === false) return 'KOREA';
    if (univ === true) return 'YONSEI';
  }

  async calculatePoints(req: CalculatePointsReq): Promise<BaseRes> {
    const allUsers = await this.usersService.findAll();

    const users = allUsers.map(async (user) => {
      const pointsToBeSet = await this.gameService.calcPoints(user, req.day);

      user.points = pointsToBeSet;

      const userWithPointsSaved = await this.usersService.saveUser(user);
      return userWithPointsSaved;
    });

    const usersSet = await Promise.all(users);
    if (usersSet)
      return {
        message: 'success',
        resultCode: '0',
      };
  }
  // // TODO : loop 추가하기
  // async updateMetaData(): Promise<void> {
  //   for (let i = 1; i <= LOOP_TIME; i++) {
  //     const beginNum: Number = 1;
  //     const hex = '0x' + beginNum.toString(16);

  //     const result = await lastValueFrom(
  //       this.http.put(
  //         `https://th-api.klaytnapi.com/v2/contract/nft/${process.env.NFT_ADDRESS}/token/${hex}/metadata`,
  //         '',
  //         {
  //           auth: { username: process.env.ID, password: process.env.PW },
  //           headers: { 'x-chain-id': process.env.X_CHAIN_ID },
  //         },
  //       ),
  //     );
  //     console.log(`${hex}`, result);
  //   }
  // }
}
