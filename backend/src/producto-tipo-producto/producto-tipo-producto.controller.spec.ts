import { Test, TestingModule } from '@nestjs/testing';
import { ProductoTipoProductoController } from './producto-tipo-producto.controller';
import { ProductoTipoProductoService } from './producto-tipo-producto.service';

describe('ProductoTipoProductoController', () => {
  let controller: ProductoTipoProductoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductoTipoProductoController],
      providers: [ProductoTipoProductoService],
    }).compile();

    controller = module.get<ProductoTipoProductoController>(ProductoTipoProductoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
