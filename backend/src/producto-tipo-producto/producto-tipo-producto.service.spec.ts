import { Test, TestingModule } from '@nestjs/testing';
import { ProductoTipoProductoService } from './producto-tipo-producto.service';

describe('ProductoTipoProductoService', () => {
  let service: ProductoTipoProductoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductoTipoProductoService],
    }).compile();

    service = module.get<ProductoTipoProductoService>(ProductoTipoProductoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
