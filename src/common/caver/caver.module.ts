import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { caverProvider } from './caver.provider';
import { CaverService } from './caver.service';

@Module({
  imports: [ConfigModule],
  providers: [...caverProvider, CaverService, ConfigService],
  exports: [CaverService],
})
export class CaverModule {}
