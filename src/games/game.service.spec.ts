import { Test, TestingModule } from '@nestjs/testing';
import { GameServiceImpl } from './game.service';

describe('GamesService', () => {
  let service: GameServiceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameServiceImpl],
    }).compile();

    service = module.get<GameServiceImpl>(GameServiceImpl);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
