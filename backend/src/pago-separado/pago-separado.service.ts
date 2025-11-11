import { Injectable } from '@nestjs/common';
import { CreatePagoSeparadoDto } from './dto/create-pago-separado.dto';
import { UpdatePagoSeparadoDto } from './dto/update-pago-separado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PagoSeparado } from './entities/pago-separado.entity';

@Injectable()
export class PagoSeparadoService {
  constructor(
    @InjectRepository(PagoSeparado)
    private readonly pagoSeparadoRepository: Repository<PagoSeparado>,
  ) {}

  create(createPagoSeparadoDto: CreatePagoSeparadoDto) {
    const newPagoSeparado = this.pagoSeparadoRepository.create(createPagoSeparadoDto);
    return this.pagoSeparadoRepository.save(newPagoSeparado);
  }

  getPagoSeparado(){
    return this.pagoSeparadoRepository.find();
  }

  findAll() {
    return `This action returns all pagoSeparado`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pagoSeparado`;
  }

  update(id: number, updatePagoSeparadoDto: UpdatePagoSeparadoDto) {
    return `This action updates a #${id} pagoSeparado`;
  }

  remove(id: number) {
    return `This action removes a #${id} pagoSeparado`;
  }
}
