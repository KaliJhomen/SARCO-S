import { Module } from '@nestjs/common';
import { UsuarioPermisoService } from './usuario-permiso.service';
import { UsuarioPermisoController } from './usuario-permiso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioPermiso } from './entities/usuario-permiso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioPermiso])],
  controllers: [UsuarioPermisoController],
  providers: [UsuarioPermisoService],
})
export class UsuarioPermisoModule {}
