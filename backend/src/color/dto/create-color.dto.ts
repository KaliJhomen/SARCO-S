import { IsString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateColorDto {
  @ApiProperty()
  @IsString()
  nombre: string;

  @ApiProperty()  
  @IsString()
  codigoHex: string;

}