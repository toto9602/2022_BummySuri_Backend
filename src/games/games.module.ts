import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { GamesService } from './games.service';

@Module({
  imports: [UsersModule],
  providers: [GamesService],
})
export class GamesModule {}
