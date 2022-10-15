import { Inject, Injectable } from '@nestjs/common';
import Caver from 'caver-js';

import { CAVER } from './caver.provider';

interface CaverService {
  call(to: string, input: string, rpcUrl?: string): Promise<string>;
}
@Injectable()
export class CaverServiceImpl implements CaverService {
  constructor(
    @Inject(CAVER)
    private caver: Caver,
  ) {}

  async call(to: string, input: string, rpcUrl?: string) {
    const caver = rpcUrl ? new Caver(rpcUrl) : this.caver;

    return caver.rpc.klay.call({
      to,
      input,
    });
  }

  async sendRawTx(rawTx: string, rpcUrl?: string) {
    const caver = rpcUrl ? new Caver(rpcUrl) : this.caver;

    return caver.rpc.klay.sendRawTransaction(rawTx);
  }
}
