import { Test, TestingModule } from '@nestjs/testing';
import { PagoSeparadoController } from './pago-separado.controller';
import { PagoSeparadoService } from './pago-separado.service';

describe('PagoSeparadoController', () => {
  let controller: PagoSeparadoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PagoSeparadoController],
      providers: [PagoSeparadoService],
    }).compile();

    controller = module.get<PagoSeparadoController>(PagoSeparadoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
