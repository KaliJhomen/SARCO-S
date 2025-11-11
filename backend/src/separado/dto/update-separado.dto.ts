import { PartialType } from '@nestjs/mapped-types';
import { CreateSeparadoDto } from './create-separado.dto';

export class UpdateSeparadoDto extends PartialType(CreateSeparadoDto) {}
