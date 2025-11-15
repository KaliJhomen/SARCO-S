import { IsString, IsNumber, IsOptional, IsBoolean, IsDateString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductoDto {
  @ApiProperty()
  @IsString()
  nombre: string;

  @ApiProperty()
  @IsString()
  modelo: string;
  
  @ApiProperty()
  @IsNumber()
  idMarca: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  descripcion?: string | null;

  @ApiProperty({default:0})
  @IsNumber()
  stock: number;

  @ApiProperty({required:false})
  @IsString()
  @IsOptional()
  imagen?: string | null; 

  @ApiProperty({ required:false })
  @IsNumber()
  @IsOptional()
  precioTope?: number | null; 

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  precioVenta?: number | null;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  estado?: boolean | null; 

  @ApiProperty({ required: false, type: String, format: 'date' })
  @IsOptional()
  @IsDateString()
  fechaIngreso?: string | null;

  @ApiProperty({ required: false, type: String, format: 'date' })
  @IsOptional()
  @IsDateString()
  garantiaFabrica?: string | null; 

  @ApiProperty({required:false})
  @IsNumber()
  @IsOptional()
  descuento?: number | null;
}