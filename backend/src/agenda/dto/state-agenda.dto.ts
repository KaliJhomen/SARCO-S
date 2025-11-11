import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateEstadoAgendaDto {
    @ApiProperty({
        description: 'Estado de la agenda',
        example: 1,
        required: true,
    })
    @IsNumber()
    estado: number;
}
