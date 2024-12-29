import { Test, TestingModule } from '@nestjs/testing';
import { ClotchesService } from './clotches.service';

describe('ClotchesService', () => {
  let service: ClotchesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClotchesService],
    }).compile();

    service = module.get<ClotchesService>(ClotchesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
