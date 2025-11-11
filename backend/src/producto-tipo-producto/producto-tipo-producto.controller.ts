import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductoTipoProductoService } from './producto-tipo-producto.service';
import { CreateProductoTipoProductoDto } from './dto/create-producto-tipo-producto.dto';
import { UpdateProductoTipoProductoDto } from './dto/update-producto-tipo-producto.dto';

@Controller('producto-tipo-producto')
export class ProductoTipoProductoController {
  constructor(private readonly productoTipoProductoService: ProductoTipoProductoService) {}

  @Post()
  create(@Body() createProductoTipoProductoDto: CreateProductoTipoProductoDto) {
    return this.productoTipoProductoService.create(createProductoTipoProductoDto);
  }

  @Get()
  findAll() {
    return this.productoTipoProductoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productoTipoProductoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductoTipoProductoDto: UpdateProductoTipoProductoDto) {
    return this.productoTipoProductoService.update(+id, updateProductoTipoProductoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productoTipoProductoService.remove(+id);
  }
}
