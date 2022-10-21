import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';

import { GameGuess } from './game.entity';
import { GameServiceImpl } from './game.service';

@Module({
  imports: [TypeOrmModule.forFeature([GameGuess]), UsersModule],
  providers: [GameServiceImpl],
  exports: [GameServiceImpl],
})
export class GameModule {}
