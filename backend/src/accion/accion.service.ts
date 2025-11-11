import { Injectable } from '@nestjs/common';
import { CreateAccionDto } from './dto/create-accion.dto';
import { UpdateAccionDto } from './dto/update-accion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Accion } from './entities/accion.entity';

@Injectable()
export class AccionService {
  constructor(
    @InjectRepository(Accion)
    private accionRepository: Repository<Accion>,
  ) { }
  create(createAccionDto: CreateAccionDto) {
    return 'This action adds a new accion';
  }

  getAcciones() {
    return this.accionRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} accion`;
  }

  update(id: number, updateAccionDto: UpdateAccionDto) {
    return `This action updates a #${id} accion`;
  }

  remove(id: number) {
    return `This action removes a #${id} accion`;
  }
}
