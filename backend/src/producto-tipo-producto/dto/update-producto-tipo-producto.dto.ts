import { PartialType } from '@nestjs/swagger';
import { CreateProductoTipoProductoDto } from './create-producto-tipo-producto.dto';

export class UpdateProductoTipoProductoDto extends PartialType(CreateProductoTipoProductoDto) {}
