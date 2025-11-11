import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCategoriaDto } from './create-categoria.dto';
import { IsString } from 'class-validator';

export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) {
    @ApiProperty({
        description: 'Nuevo nombre de la categoria',
        example: "Electronica",
        required: true,
    })
    @IsString()
    nombre?: string;

    @ApiProperty({
        description: 'Nueva descripcion de la categoria',
        example: "Dispositivos y gadgets electronicos",
        required: false,
    })
    @IsString()
    descripcion?: string;

    @ApiProperty({
        description: 'Nueva imagen de la categoria',
        example: "http://example.com/imagen.jpg",
        required: false,
    })
    @IsString()
    imagen?: string;
}
