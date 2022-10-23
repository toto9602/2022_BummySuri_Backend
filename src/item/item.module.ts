import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';

import { ItemServiceImpl } from './item.service';
import { Item } from './item.entity';
import { Betted } from '../user_item/betted.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Betted]), UsersModule, ItemModule],
  providers: [ItemServiceImpl],
  exports: [ItemServiceImpl],
})
export class ItemModule {}
