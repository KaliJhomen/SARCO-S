import { Test, TestingModule } from '@nestjs/testing';
import { EstadoClienteService } from './estado-cliente.service';

describe('EstadoClienteService', () => {
  let service: EstadoClienteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstadoClienteService],
    }).compile();

    service = module.get<EstadoClienteService>(EstadoClienteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
