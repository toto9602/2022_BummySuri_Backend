const Caver = require('caver-js');
import abi from '../../abi';

export type University = 'KOREA' | 'YONSEI';

export class ContractFactory {
  private koreaContract;
  private yonseiContract;
  constructor() {
    const caver = new Caver(process.env.PRIVATE_PROVIDER_URL.toString());
    const keyring = caver.wallet.keyring.createFromPrivateKey(
      process.env.DEPLOYER_PRIVATE_KEY,
    );
    caver.wallet.add(keyring);

    const koreaContract = caver.contract.create(
      abi,
      process.env.KU_BAOBAB_ADDR,
    );
    const yonseiContract = caver.contract.create(
      abi,
      process.env.YU_BAOBAB_ADDR,
    );
    this.koreaContract = koreaContract;
    this.yonseiContract = yonseiContract;
  }

  get(univ: University) {
    if (univ === 'KOREA') return this.koreaContract;
    if (univ === 'YONSEI') return this.yonseiContract;
  }
}
