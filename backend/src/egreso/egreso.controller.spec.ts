import { Test, TestingModule } from '@nestjs/testing';
import { EgresoController } from './egreso.controller';
import { EgresoService } from './egreso.service';

describe('EgresoController', () => {
  let controller: EgresoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EgresoController],
      providers: [EgresoService],
    }).compile();

    controller = module.get<EgresoController>(EgresoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
