import { Test, TestingModule } from '@nestjs/testing';
import { DetalleSeparadoService } from './detalle-separado.service';

describe('DetalleSeparadoService', () => {
  let service: DetalleSeparadoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetalleSeparadoService],
    }).compile();

    service = module.get<DetalleSeparadoService>(DetalleSeparadoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
