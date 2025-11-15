import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateProductoColorDto } from './create-producto-color.dto';

export class UpdateProductoColorDto extends PartialType(CreateProductoColorDto) {}