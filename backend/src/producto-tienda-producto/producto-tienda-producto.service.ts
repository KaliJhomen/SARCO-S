import { Injectable } from '@nestjs/common';
import { CreateProductoTiendaProductoDto } from './dto/create-producto-tienda-producto.dto';
import { UpdateProductoTiendaProductoDto } from './dto/update-producto-tienda-producto.dto';

@Injectable()
export class ProductoTiendaProductoService {
  create(createProductoTiendaProductoDto: CreateProductoTiendaProductoDto) {
    return 'This action adds a new productoTiendaProducto';
  }

  findAll() {
    return `This action returns all productoTiendaProducto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productoTiendaProducto`;
  }

  update(id: number, updateProductoTiendaProductoDto: UpdateProductoTiendaProductoDto) {
    return `This action updates a #${id} productoTiendaProducto`;
  }

  remove(id: number) {
    return `This action removes a #${id} productoTiendaProducto`;
  }
}
