import { Test, TestingModule } from '@nestjs/testing';
import { PagoSeparadoService } from './pago-separado.service';

describe('PagoSeparadoService', () => {
  let service: PagoSeparadoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PagoSeparadoService],
    }).compile();

    service = module.get<PagoSeparadoService>(PagoSeparadoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
