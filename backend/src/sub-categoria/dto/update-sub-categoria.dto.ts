import { PartialType } from '@nestjs/swagger';
import { CreateSubCategoriaDto } from './create-sub-categoria.dto';

export class UpdateSubCategoriaDto extends PartialType(CreateSubCategoriaDto) {}
