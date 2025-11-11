import { Injectable } from '@nestjs/common';
import { CreatePlanPagoDto } from './dto/create-plan-pago.dto';
import { UpdatePlanPagoDto } from './dto/update-plan-pago.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlanPago } from './entities/plan-pago.entity';

@Injectable()
export class PlanPagoService {
  constructor(
    @InjectRepository(PlanPago)
    private readonly planPagoRepository: Repository<PlanPago>,
  ) {}

  create(createPlanPagoDto: CreatePlanPagoDto) {
    const newPlanPago = this.planPagoRepository.create(createPlanPagoDto);
    return this.planPagoRepository.save(newPlanPago);
  }

  getPlanPago(){
    return this.planPagoRepository.find();
  }

  findAll() {
    return `This action returns all planPago`;
  }

  findOne(id: number) {
    return `This action returns a #${id} planPago`;
  }

  update(id: number, updatePlanPagoDto: UpdatePlanPagoDto) {
    return `This action updates a #${id} planPago`;
  }

  remove(id: number) {
    return `This action removes a #${id} planPago`;
  }
}
