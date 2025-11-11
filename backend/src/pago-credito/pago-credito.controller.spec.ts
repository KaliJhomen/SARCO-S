import { Test, TestingModule } from '@nestjs/testing';
import { PagoCreditoController } from './pago-credito.controller';
import { PagoCreditoService } from './pago-credito.service';

describe('PagoCreditoController', () => {
  let controller: PagoCreditoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PagoCreditoController],
      providers: [PagoCreditoService],
    }).compile();

    controller = module.get<PagoCreditoController>(PagoCreditoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
