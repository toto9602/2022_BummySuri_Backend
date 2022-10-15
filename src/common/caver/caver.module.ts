import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { caverProvider } from './caver.provider';
import { CaverServiceImpl } from './caver.service';

@Module({
  imports: [ConfigModule],
  providers: [...caverProvider, CaverServiceImpl, ConfigService],
  exports: [CaverServiceImpl],
})
export class CaverModule {}
