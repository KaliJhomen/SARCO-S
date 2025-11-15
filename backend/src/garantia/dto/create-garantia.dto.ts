import { IsString, IsNumber, IsOptional, IsEnum, IsDateString} from 'class-validator';
import { ApiProperty, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { EstadoGarantia } from '../enums/estado-garantia.enum';

export class CreateGarantiaDto {
    @ApiProperty({required:false})
    @IsNumber()
    @IsOptional()
    idUsuario?: number | null;

    @ApiProperty({required:false})
    @IsNumber()
    @IsOptional()
    idCliente?: number | null;
    
    @ApiProperty({required:false})
    @IsNumber()
    @IsOptional()
    idProducto?: number | null;
    
    @ApiProperty({required:false})
    @IsNumber()
    @IsOptional()
    idTienda?: number | null;
    
    @ApiProperty({ required:false })
    @IsString()
    @IsOptional()
    descripcion?: string | null;

    @ApiProperty({ type: String, format: 'date' })
    @IsDateString()
    fechaIngreso: string;
    
    @ApiProperty({ required: false, type: String, format: 'date' })
    @IsDateString()
    fechaDevolucion?: string | null;

    @ApiProperty({ required: false, enum: EstadoGarantia })
    @IsOptional()
    @IsEnum(EstadoGarantia)
    estado?: EstadoGarantia | null;
}
