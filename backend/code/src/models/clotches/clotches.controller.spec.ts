import { Test, TestingModule } from '@nestjs/testing';
import { ClotchesController } from './clotches.controller';
import { ClotchesService } from './clotches.service';

describe('ClotchesController', () => {
  let controller: ClotchesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClotchesController],
      providers: [ClotchesService],
    }).compile();

    controller = module.get<ClotchesController>(ClotchesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
