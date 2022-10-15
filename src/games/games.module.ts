import { Module } from '@nestjs/common';

import { UsersModule } from 'src/users/users.module';
import { GamesServiceImpl } from './games.service';

@Module({
  imports: [UsersModule],
  providers: [GamesServiceImpl],
})
export class GamesModule {}
