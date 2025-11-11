import { PartialType } from '@nestjs/swagger';
import { CreateProductoTiendaProductoDto } from './create-producto-tienda-producto.dto';

export class UpdateProductoTiendaProductoDto extends PartialType(CreateProductoTiendaProductoDto) {}
