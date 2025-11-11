import { Injectable } from '@nestjs/common';
import { CreateTiendaDto } from './dto/create-tienda.dto';
import { UpdateTiendaDto } from './dto/update-tienda.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tienda } from './entities/tienda.entity';

@Injectable()
export class TiendaService {
  constructor(
    @InjectRepository(Tienda)
    private readonly tiendaRepository: Repository<Tienda>,
  ) {}

  createTienda(createTiendaDto: CreateTiendaDto) {
    const newTienda = this.tiendaRepository.create(createTiendaDto);
    return this.tiendaRepository.save(newTienda);
  }

  getTiendas() {
    return this.tiendaRepository.find();
  }

  findAll() {
    return `This action returns all tienda`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tienda`;
  }

  update(id: number, updateTiendaDto: UpdateTiendaDto) {
    return `This action updates a #${id} tienda`;
  }

  remove(id: number) {
    return `This action removes a #${id} tienda`;
  }
}
