import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCargoDto {
    @ApiProperty({
        description: 'Nombre del cargo',
        example: 'Gerente'
    })
    @IsString()
    nombre: string;
}
