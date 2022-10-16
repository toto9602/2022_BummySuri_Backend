import { ethers } from 'ethers';

export default new ethers.utils.Interface([
  'function singleMint(address receiver) external preMintChecker(receiver) ',
]);
