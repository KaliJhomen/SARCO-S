import { Injectable } from '@nestjs/common';
import { CreateUsuarioPermisoDto } from './dto/create-usuario-permiso.dto';
import { UpdateUsuarioPermisoDto } from './dto/update-usuario-permiso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioPermiso } from './entities/usuario-permiso.entity';

@Injectable()
export class UsuarioPermisoService {
  constructor(
    @InjectRepository(UsuarioPermiso)
    private readonly usuarioPermisoRepository: Repository<UsuarioPermiso>,
  ) {}

  create(createUsuarioPermisoDto: CreateUsuarioPermisoDto) {
    return 'This action adds a new usuarioPermiso';
  }

  getUsuarioPermisos(){
    return this.usuarioPermisoRepository.find();
  }

  findAll() {
    return `This action returns all usuarioPermiso`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuarioPermiso`;
  }

  update(id: number, updateUsuarioPermisoDto: UpdateUsuarioPermisoDto) {
    return `This action updates a #${id} usuarioPermiso`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuarioPermiso`;
  }
}
