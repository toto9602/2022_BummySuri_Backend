import { Test, TestingModule } from '@nestjs/testing';
import { GamesServiceImpl } from './games.service';

describe('GamesService', () => {
  let service: GamesServiceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GamesServiceImpl],
    }).compile();

    service = module.get<GamesServiceImpl>(GamesServiceImpl);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
