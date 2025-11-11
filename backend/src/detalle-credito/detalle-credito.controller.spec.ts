import { Test, TestingModule } from '@nestjs/testing';
import { DetalleCreditoController } from './detalle-credito.controller';
import { DetalleCreditoService } from './detalle-credito.service';

describe('DetalleCreditoController', () => {
  let controller: DetalleCreditoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetalleCreditoController],
      providers: [DetalleCreditoService],
    }).compile();

    controller = module.get<DetalleCreditoController>(DetalleCreditoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
