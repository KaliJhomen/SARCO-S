import { Test, TestingModule } from '@nestjs/testing';
import { SubCategoriaService } from './sub-categoria.service';

describe('SubCategoriaService', () => {
  let service: SubCategoriaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubCategoriaService],
    }).compile();

    service = module.get<SubCategoriaService>(SubCategoriaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
