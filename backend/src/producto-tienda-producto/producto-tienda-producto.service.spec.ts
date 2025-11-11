import { Test, TestingModule } from '@nestjs/testing';
import { ProductoTiendaProductoService } from './producto-tienda-producto.service';

describe('ProductoTiendaProductoService', () => {
  let service: ProductoTiendaProductoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductoTiendaProductoService],
    }).compile();

    service = module.get<ProductoTiendaProductoService>(ProductoTiendaProductoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
