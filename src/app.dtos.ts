import { IsAddress } from './dtos.validation';

export class MintReq {
  @IsAddress()
  userAddr: string;
}

export class MintDto {
  userAddr: string;
}
