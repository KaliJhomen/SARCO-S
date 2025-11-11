import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SubCategoriaService } from './sub-categoria.service';
import { CreateSubCategoriaDto } from './dto/create-sub-categoria.dto';
import { UpdateSubCategoriaDto } from './dto/update-sub-categoria.dto';
import { ApiQuery, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('SubCategoria')
@Controller('sub-categoria')
export class SubCategoriaController {
  constructor(private readonly subCategoriaService: SubCategoriaService) {}

  @Post()
  create(@Body() createSubCategoriaDto: CreateSubCategoriaDto) {
    return this.subCategoriaService.create(createSubCategoriaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener subcategorías (opcionalmente filtradas por categoría)' })
  @ApiQuery({ name: 'categoria_id', required: false, type: Number, description: 'ID de la categoría para filtrar' })
  @ApiResponse({ status: 200, description: 'Lista de subcategorías devuelta' })
  findAll(@Query('categoria_id') categoriaId?: number) {
    return this.subCategoriaService.findAll(categoriaId ? Number(categoriaId) : undefined);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subCategoriaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubCategoriaDto: UpdateSubCategoriaDto) {
    return this.subCategoriaService.update(+id, updateSubCategoriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subCategoriaService.remove(+id);
  }
}