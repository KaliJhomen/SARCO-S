import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateCategoriaDto {
  @ApiProperty({
    description: 'Nombre del cargo',
    example: 'Gerente'
  })
  @IsString()
  nombre: string;

  
  @ApiProperty({
    description: 'Descripción de la categoría',
    example: 'Categoría de productos electrónicos'
  })
  @IsString()
  descripcion?: string;

  @ApiProperty({
    description: 'URL de la imagen de la categoría',
    example: 'https://example.com/imagen.jpg'
  })
  @IsString()
  imagen?: string;

  @ApiProperty({
    description: 'Condición de la categoría',
    example: 'Activo'
  })
  @IsNumber()
  condicion?: string;
}