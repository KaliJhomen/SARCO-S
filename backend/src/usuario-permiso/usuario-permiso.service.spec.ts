import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioPermisoService } from './usuario-permiso.service';

describe('UsuarioPermisoService', () => {
  let service: UsuarioPermisoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuarioPermisoService],
    }).compile();

    service = module.get<UsuarioPermisoService>(UsuarioPermisoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
