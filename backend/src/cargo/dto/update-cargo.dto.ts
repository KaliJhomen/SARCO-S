import { PartialType } from '@nestjs/mapped-types';
import { CreateCargoDto } from './create-cargo.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateCargoDto extends PartialType(CreateCargoDto) {
    @ApiProperty({
        description: 'Nuevo nombre del cargo',
        example: "Gerente",
        required: true,
    })
    @IsString()
    nombre: string;
}
