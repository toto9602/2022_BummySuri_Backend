import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';

import { ItemServiceImpl } from './item.service';
import { Item } from './item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item]), UsersModule],
  providers: [ItemServiceImpl],
  exports: [ItemServiceImpl],
})
export class GameModule {}
