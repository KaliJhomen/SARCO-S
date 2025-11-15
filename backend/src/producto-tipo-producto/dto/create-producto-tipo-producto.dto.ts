import {ApiProperty} from '@nestjs/swagger';
import {IsNumber } from 'class-validator';
export class CreateProductoTipoProductoDto {
    @ApiProperty()
    @IsNumber()
    idProducto: number;

    @ApiProperty()
    @IsNumber()
    idTipoProducto: number;
}
