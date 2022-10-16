import { IsString } from 'class-validator';
import { IsAddress } from './dtos.validation';

export class MintReq {
  @IsAddress()
  userAddr: string;

  @IsString()
  name: string;

  @IsString()
  univ: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  major: string;
}

export class MintDto {
  userAddr: string;
  name: string;
  univ: string;
  phoneNumber: string;
  major: string;
}
