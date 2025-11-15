import { Controller, Post, Body, Param, Get, Patch, Delete } from '@nestjs/common';
import { ProductoColorService } from './producto-color.service';
import { CreateProductoColorDto } from './dto/create-producto-color.dto';

@Controller('producto-color')
export class ProductoColorController {
  constructor(private readonly productoColorService: ProductoColorService) {}

  @Post()
  create(@Body() dto: CreateProductoColorDto) {
    return this.productoColorService.create(dto);
  }

  @Get('producto/:id')
  findAllByProducto(@Param('id') id: number) {
    return this.productoColorService.findAllByProducto(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: Partial<CreateProductoColorDto>) {
    return this.productoColorService.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productoColorService.remove(Number(id));
  }
}