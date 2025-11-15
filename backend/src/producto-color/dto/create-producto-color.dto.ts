import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductoColorDto {
  @ApiProperty()
  @IsNumber()
  idProducto: number;

  @ApiProperty()
  @IsNumber()
  idColor: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  stock?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  imagen?: string;
}