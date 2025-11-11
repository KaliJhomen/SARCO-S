import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductoTipoProductoDto } from './dto/create-producto-tipo-producto.dto';
import { UpdateProductoTipoProductoDto } from './dto/update-producto-tipo-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductoTipoProducto } from './entities/producto-tipo-producto.entity';

@Injectable()
export class ProductoTipoProductoService {
  constructor(
    @InjectRepository(ProductoTipoProducto)
    private productoTipoProductoRepository: Repository<ProductoTipoProducto>,
  ) { }
  create(createProductoTipoProductoDto: CreateProductoTipoProductoDto) {
    return 'This action adds a new productoTipoProducto';
  }

  async findAll() {
    try {
      return await this.productoTipoProductoRepository.find();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Ocurrió un error al obtener las categorías',
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} productoTipoProducto`;
  }

  update(id: number, updateProductoTipoProductoDto: UpdateProductoTipoProductoDto) {
    return `This action updates a #${id} productoTipoProducto`;
  }

  remove(id: number) {
    return `This action removes a #${id} productoTipoProducto`;
  }
}
