import { Injectable } from '@nestjs/common';
import { CreatePagoCreditoDto } from './dto/create-pago-credito.dto';
import { UpdatePagoCreditoDto } from './dto/update-pago-credito.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PagoCredito } from './entities/pago-credito.entity';

@Injectable()
export class PagoCreditoService {
  constructor(
    @InjectRepository(PagoCredito)
    private readonly pagoCreditoRepository: Repository<PagoCredito>,
  ) {}

  create(createPagoCreditoDto: CreatePagoCreditoDto) {
    const newPagoCredito = this.pagoCreditoRepository.create(createPagoCreditoDto);
    return this.pagoCreditoRepository.save(newPagoCredito);
  }

  getPagoCredito(){
    return this.pagoCreditoRepository.find();
  }

  findAll() {
    return `This action returns all pagoCredito`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pagoCredito`;
  }

  update(id: number, updatePagoCreditoDto: UpdatePagoCreditoDto) {
    return `This action updates a #${id} pagoCredito`;
  }

  remove(id: number) {
    return `This action removes a #${id} pagoCredito`;
  }
}
