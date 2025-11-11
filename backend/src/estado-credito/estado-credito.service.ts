import { Injectable } from '@nestjs/common';
import { CreateEstadoCreditoDto } from './dto/create-estado-credito.dto';
import { UpdateEstadoCreditoDto } from './dto/update-estado-credito.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstadoCredito } from './entities/estado-credito.entity';

@Injectable()
export class EstadoCreditoService {
  constructor(
    @InjectRepository(EstadoCredito)
    private readonly estadoCreditoRepository: Repository<EstadoCredito>,
  ) {}

  create(createEstadoCreditoDto: CreateEstadoCreditoDto) {
    return 'This action adds a new estadoCredito';
  }

  getEstadoCredito() {
    return this.estadoCreditoRepository.find();
  }

  findAll() {
    return `This action returns all estadoCredito`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estadoCredito`;
  }

  update(id: number, updateEstadoCreditoDto: UpdateEstadoCreditoDto) {
    return `This action updates a #${id} estadoCredito`;
  }

  remove(id: number) {
    return `This action removes a #${id} estadoCredito`;
  }
}
