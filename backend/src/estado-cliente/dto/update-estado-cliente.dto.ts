import { PartialType } from '@nestjs/mapped-types';
import { CreateEstadoClienteDto } from './create-estado-cliente.dto';

export class UpdateEstadoClienteDto extends PartialType(CreateEstadoClienteDto) {}
