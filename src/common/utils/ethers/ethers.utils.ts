// import {ethers} from "ethers"

import iface from './contract.interface';

class EthersUtil {
  private static readonly iface = iface;

  static encodeFunctionData(fn: Contract.FunctionName, params: any[]): string {
    return EthersUtil.iface.encodeFunctionData(fn, params);
  }

  static decodeFunctionData(functionData: string) {
    return EthersUtil.iface.parseTransaction({ data: functionData });
  }
}

export default EthersUtil;
