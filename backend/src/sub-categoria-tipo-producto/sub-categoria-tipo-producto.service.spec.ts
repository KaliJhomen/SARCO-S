import { Test, TestingModule } from '@nestjs/testing';
import { SubCategoriaTipoProductoService } from './sub-categoria-tipo-producto.service';

describe('SubCategoriaTipoProductoService', () => {
  let service: SubCategoriaTipoProductoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubCategoriaTipoProductoService],
    }).compile();

    service = module.get<SubCategoriaTipoProductoService>(SubCategoriaTipoProductoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
