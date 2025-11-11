import { Test, TestingModule } from '@nestjs/testing';
import { GarantiaService } from './garantia.service';

describe('GarantiaService', () => {
  let service: GarantiaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GarantiaService],
    }).compile();

    service = module.get<GarantiaService>(GarantiaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
