import { PartialType } from '@nestjs/mapped-types';
import { CreateEstadoCreditoDto } from './create-estado-credito.dto';

export class UpdateEstadoCreditoDto extends PartialType(CreateEstadoCreditoDto) {}
