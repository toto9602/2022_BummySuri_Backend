import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GameGuess } from './game.entity';
import { GameGuessDto } from '../app.dtos';
import { UsersServiceImpl } from '../users/users.service';
import { User } from '../users/user.entity';

interface GameService {
  saveGameGuess(req: GameGuessDto): Promise<GameGuess>;
}

@Injectable()
export class GameServiceImpl implements GameService {
  constructor(
    @InjectRepository(GameGuess)
    private gameRepository: Repository<GameGuess>,
    private usersService: UsersServiceImpl,
  ) {}

  async saveGameGuess(req: GameGuessDto): Promise<GameGuess> {
    try {
      const user = await this.usersService.getUserByAddr(req.userAddr);

      if (user) {
        const newGameGuess = this.gameRepository.create({
          baseballWin: req.baseball.univWin,
          baseballGap: req.baseball.scoreGap,
          iceHockeyWin: req.iceHockey.univWin,
          iceHockeyGap: req.iceHockey.scoreGap,
          basketballWin: req.basketball.univWin,
          basketballGap: req.basketball.scoreGap,
          rugbyWin: req.rugby.univWin,
          rugbyGap: req.rugby.scoreGap,
          soccerWin: req.soccer.univWin,
          soccerGap: req.soccer.scoreGap,
          user: user,
        });

        await this.gameRepository.save(newGameGuess);
        return newGameGuess;
      }
      throw new BadRequestException('User not Found');
    } catch (err: any) {
      const msg = err.message || '';
      throw new InternalServerErrorException(msg);
    }
  }

  async calculateFirstDayPoints(user: User): Promise<number> {
    let points: number = user.points;

    const gameGuess = await this.gameRepository.findOneBy({ user: user });

    // 야구
    // if (FinalResult.BASEBALL_WIN == 'TIE') {
    //   if (gameGuess.baseballWin == 'TIE') {
    //     points = points + 1500;
    //   }
    // } else {
    //   if (gameGuess.baseballWin == FinalResult.BASEBALL_WIN) {
    //     points = points + 1000;

    //     if (gameGuess.baseballGap == FinalResult.BASEBALL_GAP) {
    //       points = points + 1000;
    //     }
    //   }
    // }
    // // 빙구
    // if (FinalResult.ICEHOCKEY_WIN == 'TIE') {
    //   if (gameGuess.iceHockeyWin == 'TIE') {
    //     points = points + 1500;
    //   }
    // } else {
    //   if (gameGuess.iceHockeyWin == FinalResult.ICEHOCKEY_WIN) {
    //     points = points + 1000;

    //     if (gameGuess.iceHockeyGap == FinalResult.ICEHOCKEY_GAP) {
    //       points = points + 1000;
    //     }
    //   }
    // }
    // // 농구
    // if (FinalResult.BASKETBALL_WIN == 'TIE') {
    //   if (gameGuess.basketballWin == 'TIE') {
    //     points = points + 1500;
    //   }
    // } else {
    //   if (gameGuess.basketballWin == FinalResult.BASKETBALL_WIN) {
    //     points = points + 1000;

    //     if (gameGuess.basketballGap == FinalResult.BASKETBALL_GAP) {
    //       points = points + 1000;
    //     }
    //   }
    // }

    return points;
  }

  async calculateSecondDayPoints(user: User): Promise<number> {
    let points: number = user.points;

    const gameGuess = await this.gameRepository.findOneBy({ user: user });

    // if (day == '2') {

    //   //럭비
    //   if (FinalResult.RUGBY_WIN == 'TIE') {
    //     if (gameGuess.rugbyWin == 'TIE') {
    //       points = points + 1500;
    //     }
    //   } else {
    //     if (gameGuess.rugbyWin == FinalResult.RUGBY_WIN) {
    //       points = points + 1000;

    //       if (gameGuess.rugbyGap == FinalResult.RUGBY_GAP) {
    //         points = points + 1000;
    //       }
    //     }
    //   }
    //   //축구
    //   if (FinalResult.SOCCER_WIN == 'TIE') {
    //     if (gameGuess.soccerWin == 'TIE') {
    //       points = points + 1500;
    //     }
    //   } else {
    //     if (gameGuess.soccerWin == FinalResult.SOCCER_WIN) {
    //       points = points + 1000;

    //       if (gameGuess.soccerGap == FinalResult.SOCCER_GAP) {
    //         points = points + 1000;
    //       }
    //     }
    //   }
    // }

    return points;
  }

  private async findGameGuessByUserAddr(userAddr: string): Promise<GameGuess> {
    const user = await this.usersService.getUserByAddr(userAddr);

    const game = await this.gameRepository.findOneBy({ user: user });

    return game;
  }
}
// createGameResult(gameChoice: GameChoices): GameResults {
//   const randomResult = this.generateRandomResult();

//   if (randomResult == gameChoice) return GameResults.WIN;

//   return GameResults.LOSE;
// }

// private generateRandomResult(): GameChoices {
//   const randomResult =
//     GAME_CHOICES[Math.floor(Math.random() * GAME_CHOICES.length)];

//   return randomResult;
// }
