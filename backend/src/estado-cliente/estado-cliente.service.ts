import { Injectable } from '@nestjs/common';
import { CreateEstadoClienteDto } from './dto/create-estado-cliente.dto';
import { UpdateEstadoClienteDto } from './dto/update-estado-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstadoCliente } from './entities/estado-cliente.entity';

@Injectable()
export class EstadoClienteService {
  constructor(
    @InjectRepository(EstadoCliente)
    private readonly estadoClienteRepository: Repository<EstadoCliente>,
  ) {}

  create(createEstadoClienteDto: CreateEstadoClienteDto) {
    return 'This action adds a new estadoCliente';
  }

  getEstadoCliente(){
    return this.estadoClienteRepository.find();
  }

  findAll() {
    return `This action returns all estadoCliente`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estadoCliente`;
  }

  update(id: number, updateEstadoClienteDto: UpdateEstadoClienteDto) {
    return `This action updates a #${id} estadoCliente`;
  }

  remove(id: number) {
    return `This action removes a #${id} estadoCliente`;
  }
}
