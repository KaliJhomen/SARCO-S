import { Injectable } from '@nestjs/common';
import { CreatePenalidadeDto } from './dto/create-penalidade.dto';
import { UpdatePenalidadeDto } from './dto/update-penalidade.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Penalidades } from './entities/penalidade.entity';
import { promises } from 'dns';

@Injectable()
export class PenalidadesService {
  constructor(
    @InjectRepository(Penalidades)
    private penalidadesRepository: Repository<Penalidades>,
  ) {}
  create(createPenalidadeDto: CreatePenalidadeDto) {
    const newPenalidade = this.penalidadesRepository.create(createPenalidadeDto);
    return this.penalidadesRepository.save(newPenalidade);
  }

  getPenalidades(): Promise<Penalidades[]> {
  return this.penalidadesRepository.find();
}

  findAll() {
    return `This action returns all penalidades`;
  }

  findOne(id: number) {
    return `This action returns a #${id} penalidade`;
  }

  update(id: number, updatePenalidadeDto: UpdatePenalidadeDto) {
    return `This action updates a #${id} penalidade`;
  }

  remove(id: number) {
    return `This action removes a #${id} penalidade`;
  }
}
