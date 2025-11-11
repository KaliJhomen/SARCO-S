import { Injectable } from '@nestjs/common';
import { CreateModuloDto } from './dto/create-modulo.dto';
import { UpdateModuloDto } from './dto/update-modulo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Modulo } from './entities/modulo.entity';

@Injectable()
export class ModuloService {
  constructor(
    @InjectRepository(Modulo)
    private moduloRespository: Repository<Modulo>,
  ){}
  create(createModuloDto: CreateModuloDto) {
    return 'This action adds a new modulo';
  }

  getModulos() {
    return this.moduloRespository.find();
  }
  findOne(id: number) {
    return `This action returns a #${id} modulo`;
  }

  update(id: number, updateModuloDto: UpdateModuloDto) {
    return `This action updates a #${id} modulo`;
  }

  remove(id: number) {
    return `This action removes a #${id} modulo`;
  }
}
