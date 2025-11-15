import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsOptional } from "class-validator";
export class CreateProductoTiendaProductoDto {
    @ApiProperty()
    @IsNumber()
    idProducto?: number | null;

    @ApiProperty( {required:false})
    @IsNumber()
    idTienda?: number | null;

    @ApiProperty({ required: false })
    @IsNumber()
    @IsOptional()
    cantidad?: number | null;

}
