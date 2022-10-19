import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  BaseRes,
  GuessGameResultParams,
  MintCountRes,
  MintDto,
} from './app.dtos';
import { ContractFactory, University } from './common/caver/caver.factory';
import { UsersServiceImpl } from './users/users.service';

@Injectable()
export class AppService {
  private contractFactory: ContractFactory;
  constructor(
    private usersService: UsersServiceImpl,
    private config: ConfigService,
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
        console.log('user created');
      }

      const univType = this.getUnivType(req.univ);
      const contract = this.contractFactory.get(univType);
      const receipt = await contract.methods.singleMint(req.userAddr).send({
        from: this.config.get('DEPLOYER_ACCOUNT'),
        gas: 250000,
      });

      return {
        resultCode: '0',
        message: 'success',
      };
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

  // async guessGameResult(req: GuessGameResultParams): Promise<BaseRes> {}
  private getUnivType(univ: string): University {
    if (univ === 'Korea') return 'KOREA';
    if (univ === 'Yonsei') return 'YONSEI';
  }
}
// const caver = new Caver(
//   this.config.get('PRIVATE_PROVIDER_URL').toString(),
// );
// const keyring = caver.wallet.keyring.createFromPrivateKey(
//   this.config.get('DEPLOYER_PRIVATE_KEY'),
// );
// caver.wallet.add(keyring);
// const contract = caver.contract.create(
//   abi,
//   this.config.get('KU_BAOBAB_ADDR'),
// );

// await contract
//   .sign(
//     { from: this.config.get('DEPLOYER_ACCOUNT'), gas: 300000 },
//     'singleMint',
//     req.userAddr,
//   )
//   .then(console.log);
// console.log('signed');

// await contract.methods
//   .adminMint(this.config.get('DEPLOYER_ACCOUNT'), 1)
//   .send({
//     from: this.config.get('DEPLOYER_ACCOUNT'),
//     gas: 250000,
//   })
//   .then(function (receipt) {
//     console.log('receipt', receipt);
//   });
// let user = await this.usersService.getUserByAddr(req.userAddr);
// // 이미 DB에 저장된 user이면 isSuccess 확인
// if (user) {
//   const alreadySucceeded = await this.usersService.checkIfSucceeded(
//     user.userAddr,
//   );

//   if (alreadySucceeded)
//     throw new BadRequestException(
//       `User with addr ${user.userAddr} already Succeeded`,
//     );
// }

// // DB에 존재하지 않는 user이면 DB에 저장
// if (user == null) {
//   user = await this.usersService.createUser(req);
//   console.log('user created');
// }

// // call singleMint

// const fn: Contract.FunctionName = 'singleMint';
// const { userAddr } = req;
// const caver = new Caver(
// this.config.get('PRIVATE_PROVIDER_URL').toString(),
// );

// const input = EthersUtil.encodeFunctionData(fn, [userAddr]);
// console.log('input', input);
// const input = caver.abi.encodeFunctionSignature({
//   name: 'singleMint',
//   type: 'function',
//   inputs: [
//     {
//       type: 'address',
//       name: 'receiver',
//     },
//   ],
// });
// console.log('input', input);
// console.log(this.config.get('PRIVATE_PROVIDER_URL'));
// console.log('PRIVATE PROVIDER', this.config.get('PRIVATE_PROVIDER_URL'));
// const tx = caver.transaction.legacyTransaction.create({
//   to: this.config.get('KU_BA0BAB_ADDR'),
//   input: input,
//   gas: 200000,
// });
// console.log('tx', tx);
// console.log('KU_BAOBAB', this.config.get('KU_BAOBAB_ADDR'));

// await caver.wallet.sign(keyring.address, input);

// const rlpEncoded = tx.getRLPEncoding();
// console.log('rplEncoded', rlpEncoded);
// const receipt = await caver.rpc.klay.sendRawTransaction(input);
// console.log(receipt);
// // const resultData = await this.caverService.call(
// //   this.config.get('ADDR'),
// //   input,
// // );
// // const result = EthersUtil.decodeFunctionResult(fn, resultData);

// return true;
