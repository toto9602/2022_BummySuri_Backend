import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { GameModule } from './games/game.module';
import { CaverModule } from './common/caver/caver.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/user.entity';
import { GameResult } from './games/game.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [User, GameResult],
      synchronize: true,
    }),
    UsersModule,
    GameModule,
    CaverModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
