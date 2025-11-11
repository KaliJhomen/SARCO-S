import { PartialType } from '@nestjs/mapped-types';
import { CreatePagoSeparadoDto } from './create-pago-separado.dto';

export class UpdatePagoSeparadoDto extends PartialType(CreatePagoSeparadoDto) {}
