import { PartialType } from '@nestjs/swagger';
import { CreateDetalleCreditoDto } from './create-detalle-credito.dto';

export class UpdateDetalleCreditoDto extends PartialType(CreateDetalleCreditoDto) {}
