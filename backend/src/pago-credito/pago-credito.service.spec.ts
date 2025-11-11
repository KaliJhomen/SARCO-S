import { Test, TestingModule } from '@nestjs/testing';
import { PagoCreditoService } from './pago-credito.service';

describe('PagoCreditoService', () => {
  let service: PagoCreditoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PagoCreditoService],
    }).compile();

    service = module.get<PagoCreditoService>(PagoCreditoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
