import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubCategoriaTipoProductoService } from './sub-categoria-tipo-producto.service';
import { CreateSubCategoriaTipoProductoDto } from './dto/create-sub-categoria-tipo-producto.dto';
import { UpdateSubCategoriaTipoProductoDto } from './dto/update-sub-categoria-tipo-producto.dto';

@Controller('sub-categoria-tipo-producto')
export class SubCategoriaTipoProductoController {
  constructor(private readonly subCategoriaTipoProductoService: SubCategoriaTipoProductoService) {}

  @Post()
  create(@Body() createSubCategoriaTipoProductoDto: CreateSubCategoriaTipoProductoDto) {
    return this.subCategoriaTipoProductoService.create(createSubCategoriaTipoProductoDto);
  }

  @Get()
  findAll() {
    return this.subCategoriaTipoProductoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subCategoriaTipoProductoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubCategoriaTipoProductoDto: UpdateSubCategoriaTipoProductoDto) {
    return this.subCategoriaTipoProductoService.update(+id, updateSubCategoriaTipoProductoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subCategoriaTipoProductoService.remove(+id);
  }
}
