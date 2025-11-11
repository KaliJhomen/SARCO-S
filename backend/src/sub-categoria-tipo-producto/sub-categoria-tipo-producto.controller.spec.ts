import { Test, TestingModule } from '@nestjs/testing';
import { SubCategoriaTipoProductoController } from './sub-categoria-tipo-producto.controller';
import { SubCategoriaTipoProductoService } from './sub-categoria-tipo-producto.service';

describe('SubCategoriaTipoProductoController', () => {
  let controller: SubCategoriaTipoProductoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubCategoriaTipoProductoController],
      providers: [SubCategoriaTipoProductoService],
    }).compile();

    controller = module.get<SubCategoriaTipoProductoController>(SubCategoriaTipoProductoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
