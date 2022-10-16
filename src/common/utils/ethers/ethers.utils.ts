// import {ethers} from "ethers"

import iface from './contract.interface';

class EthersUtil {
  private static readonly iface = iface;

  static encodeFunctionData(fn: Contract.FunctionName, params: any[]): string {
    return EthersUtil.iface.encodeFunctionData(fn, params);
  }

  static decodeFunctionResult(fn: Contract.FunctionName, resultData: string) {
    return EthersUtil.iface.decodeFunctionResult(fn, resultData);
  }
}

export default EthersUtil;
