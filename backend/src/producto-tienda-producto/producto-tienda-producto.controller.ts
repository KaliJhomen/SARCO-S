import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductoTiendaProductoService } from './producto-tienda-producto.service';
import { CreateProductoTiendaProductoDto } from './dto/create-producto-tienda-producto.dto';
import { UpdateProductoTiendaProductoDto } from './dto/update-producto-tienda-producto.dto';

@Controller('producto-tienda-producto')
export class ProductoTiendaProductoController {
  constructor(private readonly productoTiendaProductoService: ProductoTiendaProductoService) {}

  @Post()
  create(@Body() createProductoTiendaProductoDto: CreateProductoTiendaProductoDto) {
    return this.productoTiendaProductoService.create(createProductoTiendaProductoDto);
  }

  @Get()
  findAll() {
    return this.productoTiendaProductoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productoTiendaProductoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductoTiendaProductoDto: UpdateProductoTiendaProductoDto) {
    return this.productoTiendaProductoService.update(+id, updateProductoTiendaProductoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productoTiendaProductoService.remove(+id);
  }
}
