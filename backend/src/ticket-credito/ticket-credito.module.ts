import { Module } from '@nestjs/common';
import { TicketCreditoService } from './ticket-credito.service';
import { TicketCreditoController } from './ticket-credito.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketCredito } from './entities/ticket-credito.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TicketCredito])],
  controllers: [TicketCreditoController],
  providers: [TicketCreditoService],
})
export class TicketCreditoModule {}
