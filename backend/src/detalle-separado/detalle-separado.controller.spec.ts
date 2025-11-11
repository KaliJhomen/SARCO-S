import { Test, TestingModule } from '@nestjs/testing';
import { DetalleSeparadoController } from './detalle-separado.controller';
import { DetalleSeparadoService } from './detalle-separado.service';

describe('DetalleSeparadoController', () => {
  let controller: DetalleSeparadoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetalleSeparadoController],
      providers: [DetalleSeparadoService],
    }).compile();

    controller = module.get<DetalleSeparadoController>(DetalleSeparadoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
