import { Injectable } from '@nestjs/common';
import { CreateTicketCreditoDto } from './dto/create-ticket-credito.dto';
import { UpdateTicketCreditoDto } from './dto/update-ticket-credito.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketCredito } from './entities/ticket-credito.entity';

@Injectable()
export class TicketCreditoService {
  constructor(
    @InjectRepository(TicketCredito)
    private readonly ticketCreditoRepository: Repository<TicketCredito>,
  ) {}

  create(createTicketCreditoDto: CreateTicketCreditoDto) {
    return 'This action adds a new ticketCredito';
  }

  getTicketCredito(){
    return this.ticketCreditoRepository.find();
  }

  findAll() {
    return `This action returns all ticketCredito`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ticketCredito`;
  }

  update(id: number, updateTicketCreditoDto: UpdateTicketCreditoDto) {
    return `This action updates a #${id} ticketCredito`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticketCredito`;
  }
}
