import { Test, TestingModule } from '@nestjs/testing';
import { SeparadoController } from './separado.controller';
import { SeparadoService } from './separado.service';

describe('SeparadoController', () => {
  let controller: SeparadoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeparadoController],
      providers: [SeparadoService],
    }).compile();

    controller = module.get<SeparadoController>(SeparadoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
