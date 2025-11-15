import { IsString, IsOptional} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTiendaDto {
  @ApiProperty()
  @IsString()
  nombre: string;

  @ApiProperty()
  @IsString()
  direccion: string;

  @ApiProperty({ required: false, type: String, description: 'Condición como bigint' })
  @IsOptional()
  @IsString()
  condicion?: string;
}
