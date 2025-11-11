import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioPermisoController } from './usuario-permiso.controller';
import { UsuarioPermisoService } from './usuario-permiso.service';

describe('UsuarioPermisoController', () => {
  let controller: UsuarioPermisoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioPermisoController],
      providers: [UsuarioPermisoService],
    }).compile();

    controller = module.get<UsuarioPermisoController>(UsuarioPermisoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
