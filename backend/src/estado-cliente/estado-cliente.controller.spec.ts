import { Test, TestingModule } from '@nestjs/testing';
import { EstadoClienteController } from './estado-cliente.controller';
import { EstadoClienteService } from './estado-cliente.service';

describe('EstadoClienteController', () => {
  let controller: EstadoClienteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstadoClienteController],
      providers: [EstadoClienteService],
    }).compile();

    controller = module.get<EstadoClienteController>(EstadoClienteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
