import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GameResult } from './game.entity';
import { GameServiceImpl } from './game.service';

@Module({
  imports: [TypeOrmModule.forFeature([GameResult])],
  providers: [GameServiceImpl],
  exports: [GameServiceImpl],
})
export class GameModule {}
