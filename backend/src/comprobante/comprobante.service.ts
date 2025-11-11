import { Injectable } from '@nestjs/common';
import { CreateComprobanteDto } from './dto/create-comprobante.dto';
import { UpdateComprobanteDto } from './dto/update-comprobante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comprobante } from './entities/comprobante.entity';

@Injectable()
export class ComprobanteService {
  constructor(
    @InjectRepository(Comprobante)
    private comprobanteRepository: Repository<Comprobante>,
  ) {}

  create(createComprobanteDto: CreateComprobanteDto) {
    return 'This action adds a new comprobante';
  }

  getComprobantes() {
    return this.comprobanteRepository.find();
  }

  findAll() {
    return `This action returns all comprobante`;
  }

  getComprobante(id: number) {
    return this.comprobanteRepository.findOne({ where: { idComprobante: id } });
  }

  update(id: number, updateComprobanteDto: UpdateComprobanteDto) {
    return `This action updates a #${id} comprobante`;
  }

  remove(id: number) {
    return `This action removes a #${id} comprobante`;
  }
}
