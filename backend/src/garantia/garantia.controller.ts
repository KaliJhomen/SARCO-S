import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { GarantiaService } from './garantia.service';
import { CreateGarantiaDto } from './dto/create-garantia.dto';
import { UpdateGarantiaDto } from './dto/update-garantia.dto';

@Controller('garantia')
export class GarantiaController {
  constructor(private readonly garantiaService: GarantiaService) {}

  @Post()
  create(@Body() createGarantiaDto: CreateGarantiaDto) {
    if ((createGarantiaDto as any)?.idArticulo !== undefined) {
      throw new BadRequestException('Campo idArticulo no permitido. Use idProducto.');
    }
    if (createGarantiaDto?.idProducto === undefined || createGarantiaDto?.idProducto === null) {
      throw new BadRequestException('idProducto es requerido.');
    }
    return this.garantiaService.create(createGarantiaDto);
  }

  @Get()
  getGarantias() {
    return this.garantiaService.getGarantias();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.garantiaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGarantiaDto: UpdateGarantiaDto) {
    if ((updateGarantiaDto as any)?.idArticulo !== undefined) {
      throw new BadRequestException('Campo idArticulo no permitido. Use idProducto.');
    }
    if ('idProducto' in (updateGarantiaDto as any) && (updateGarantiaDto as any).idProducto == null) {
      throw new BadRequestException('Si envía idProducto debe ser un valor válido.');
    }
    return this.garantiaService.update(+id, updateGarantiaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.garantiaService.remove(+id);
  }
}
