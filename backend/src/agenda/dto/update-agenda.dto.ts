import { CreateAgendaDto } from './create-agenda.dto';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateAgendaDto extends PartialType(CreateAgendaDto) {
  @ApiProperty({
    description: 'Estado de la agenda',
    example: 1,
    required: true,
  })
  @IsNumber()
  estado: number;
}
