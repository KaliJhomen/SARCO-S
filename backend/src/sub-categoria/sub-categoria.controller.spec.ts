import { Test, TestingModule } from '@nestjs/testing';
import { SubCategoriaController } from './sub-categoria.controller';
import { SubCategoriaService } from './sub-categoria.service';

describe('SubCategoriaController', () => {
  let controller: SubCategoriaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubCategoriaController],
      providers: [SubCategoriaService],
    }).compile();

    controller = module.get<SubCategoriaController>(SubCategoriaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
