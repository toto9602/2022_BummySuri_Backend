import { ConfigService } from '@nestjs/config';
const Caver = require('caver-js');

export const CAVER = 'CAVER';

export const caverProvider = [
  {
    provide: CAVER,
    useFactory: (config: ConfigService) => new Caver('http://test.api.com'),
    inject: [ConfigService],
  },
];
