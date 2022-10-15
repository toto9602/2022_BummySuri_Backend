import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { GamesModule } from './games/games.module';
import { CaverModule } from './common/caver/caver.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_DATABASE,
      port: parseInt(process.env.MYSQL_PORT),
      database: process.env.MYSQL_DATABASE,
      entities: [],
      synchronize: true,
    }),
    UsersModule,
    GamesModule,
    CaverModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
