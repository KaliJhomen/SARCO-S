import { PartialType } from '@nestjs/mapped-types';
import { CreateEstadoVentaDto } from './create-estado-venta.dto';

export class UpdateEstadoVentaDto extends PartialType(CreateEstadoVentaDto) {}
