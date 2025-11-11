import { Test, TestingModule } from '@nestjs/testing';
import { SeparadoService } from './separado.service';

describe('SeparadoService', () => {
  let service: SeparadoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeparadoService],
    }).compile();

    service = module.get<SeparadoService>(SeparadoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
