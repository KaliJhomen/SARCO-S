import { Test, TestingModule } from '@nestjs/testing';
import { GarantiaController } from './garantia.controller';
import { GarantiaService } from './garantia.service';

describe('GarantiaController', () => {
  let controller: GarantiaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GarantiaController],
      providers: [GarantiaService],
    }).compile();

    controller = module.get<GarantiaController>(GarantiaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
