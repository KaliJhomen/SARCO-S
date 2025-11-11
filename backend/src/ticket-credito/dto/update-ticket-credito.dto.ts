import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketCreditoDto } from './create-ticket-credito.dto';

export class UpdateTicketCreditoDto extends PartialType(CreateTicketCreditoDto) {}
