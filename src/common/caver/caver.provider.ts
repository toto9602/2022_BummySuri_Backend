import { ConfigService } from '@nestjs/config';
import Caver from 'caver-js';

export const CAVER = 'CAVER';

export const caverProvider = [
  {
    provide: CAVER,
    useFactory: (config: ConfigService) => new Caver(config.get('chainUrl')),
    inject: [ConfigService],
  },
];
