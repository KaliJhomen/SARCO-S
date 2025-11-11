import { Test, TestingModule } from '@nestjs/testing';
import { EstadoCreditoService } from './estado-credito.service';

describe('EstadoCreditoService', () => {
  let service: EstadoCreditoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstadoCreditoService],
    }).compile();

    service = module.get<EstadoCreditoService>(EstadoCreditoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
