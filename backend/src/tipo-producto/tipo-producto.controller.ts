import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TipoProductoService } from './tipo-producto.service';
import { CreateTipoProductoDto } from './dto/create-tipo-producto.dto';
import { UpdateTipoProductoDto } from './dto/update-tipo-producto.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('TipoProducto')
@Controller('tipo-producto')
export class TipoProductoController {
  constructor(private readonly tipoProductoService: TipoProductoService) {}

  @Post()
  create(@Body() createTipoProductoDto: CreateTipoProductoDto) {
    return this.tipoProductoService.create(createTipoProductoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener tipos de producto (opcionalmente filtrados por subcategoría)' })
  @ApiQuery({ name: 'subcategoria_id', required: false, type: Number, description: 'ID de la subcategoría para filtrar' })
  @ApiResponse({ status: 200, description: 'Lista de tipos de producto devuelta' })
  findAll(@Query('subcategoria_id') subcategoriaId?: number) {
    return this.tipoProductoService.findAllFilteredBySubCategoria(subcategoriaId ? Number(subcategoriaId) : undefined);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoProductoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoProductoDto: UpdateTipoProductoDto) {
    return this.tipoProductoService.update(+id, updateTipoProductoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoProductoService.remove(+id);
  }
}