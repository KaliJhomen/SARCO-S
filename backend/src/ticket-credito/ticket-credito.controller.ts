import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TicketCreditoService } from './ticket-credito.service';
import { CreateTicketCreditoDto } from './dto/create-ticket-credito.dto';
import { UpdateTicketCreditoDto } from './dto/update-ticket-credito.dto';

@Controller('ticket-credito')
export class TicketCreditoController {
  constructor(private readonly ticketCreditoService: TicketCreditoService) {}

  @Post()
  create(@Body() createTicketCreditoDto: CreateTicketCreditoDto) {
    return this.ticketCreditoService.create(createTicketCreditoDto);
  }

  @Get()
  getTicketCredito() {
    return this.ticketCreditoService.getTicketCredito();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketCreditoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketCreditoDto: UpdateTicketCreditoDto) {
    return this.ticketCreditoService.update(+id, updateTicketCreditoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketCreditoService.remove(+id);
  }
}
