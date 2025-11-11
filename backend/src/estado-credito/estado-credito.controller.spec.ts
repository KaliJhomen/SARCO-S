import { Test, TestingModule } from '@nestjs/testing';
import { EstadoCreditoController } from './estado-credito.controller';
import { EstadoCreditoService } from './estado-credito.service';

describe('EstadoCreditoController', () => {
  let controller: EstadoCreditoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstadoCreditoController],
      providers: [EstadoCreditoService],
    }).compile();

    controller = module.get<EstadoCreditoController>(EstadoCreditoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
