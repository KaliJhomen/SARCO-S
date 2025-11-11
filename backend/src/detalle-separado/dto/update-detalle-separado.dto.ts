import { PartialType } from '@nestjs/swagger';
import { CreateDetalleSeparadoDto } from './create-detalle-separado.dto';

export class UpdateDetalleSeparadoDto extends PartialType(CreateDetalleSeparadoDto) {}
