import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersServiceImpl } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersServiceImpl],
  controllers: [],
  exports: [UsersServiceImpl],
})
export class UsersModule {}
