import { Test, TestingModule } from '@nestjs/testing';
import { PlanPagoController } from './plan-pago.controller';
import { PlanPagoService } from './plan-pago.service';

describe('PlanPagoController', () => {
  let controller: PlanPagoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanPagoController],
      providers: [PlanPagoService],
    }).compile();

    controller = module.get<PlanPagoController>(PlanPagoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
