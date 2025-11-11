import { Injectable } from '@nestjs/common';
import { CreateSeparadoDto } from './dto/create-separado.dto';
import { UpdateSeparadoDto } from './dto/update-separado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Separado } from './entities/separado.entity';

@Injectable()
export class SeparadoService {
  constructor(
    @InjectRepository(Separado)
    private readonly separadoRepository: Repository<Separado>,
  ) {}

  create(createSeparadoDto: CreateSeparadoDto) {
    return 'This action adds a new separado';
  }

  getSeparados(){
    return this.separadoRepository.find();
  }

  findAll() {
    return `This action returns all separado`;
  }

  findOne(id: number) {
    return `This action returns a #${id} separado`;
  }

  update(id: number, updateSeparadoDto: UpdateSeparadoDto) {
    return `This action updates a #${id} separado`;
  }

  remove(id: number) {
    return `This action removes a #${id} separado`;
  }
}
