import { Injectable } from '@nestjs/common';
import { CreateEstadoVentaDto } from './dto/create-estado-venta.dto';
import { UpdateEstadoVentaDto } from './dto/update-estado-venta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstadoVenta } from './entities/estado-venta.entity';

@Injectable()
export class EstadoVentaService {
  constructor(
    @InjectRepository(EstadoVenta)
    private readonly estadoVentaRepository: Repository<EstadoVenta>,
  ) {}

  create(createEstadoVentaDto: CreateEstadoVentaDto) {
    return 'This action adds a new estadoVenta';
  }

  getEstadoVenta() {
    return this.estadoVentaRepository.find();
  }

  findAll() {
    return `This action returns all estadoVenta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estadoVenta`;
  }

  update(id: number, updateEstadoVentaDto: UpdateEstadoVentaDto) {
    return `This action updates a #${id} estadoVenta`;
  }

  remove(id: number) {
    return `This action removes a #${id} estadoVenta`;
  }
}
