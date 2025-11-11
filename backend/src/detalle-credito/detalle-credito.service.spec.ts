import { Test, TestingModule } from '@nestjs/testing';
import { DetalleCreditoService } from './detalle-credito.service';

describe('DetalleCreditoService', () => {
  let service: DetalleCreditoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetalleCreditoService],
    }).compile();

    service = module.get<DetalleCreditoService>(DetalleCreditoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
