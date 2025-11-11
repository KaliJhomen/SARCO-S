import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstadoVentaService } from './estado-venta.service';
import { CreateEstadoVentaDto } from './dto/create-estado-venta.dto';
import { UpdateEstadoVentaDto } from './dto/update-estado-venta.dto';

@Controller('estado-venta')
export class EstadoVentaController {
  constructor(private readonly estadoVentaService: EstadoVentaService) {}

  @Post()
  create(@Body() createEstadoVentaDto: CreateEstadoVentaDto) {
    return this.estadoVentaService.create(createEstadoVentaDto);
  }

  @Get()
  getEstadoVenta() {
    return this.estadoVentaService.getEstadoVenta();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estadoVentaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstadoVentaDto: UpdateEstadoVentaDto) {
    return this.estadoVentaService.update(+id, updateEstadoVentaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estadoVentaService.remove(+id);
  }
}
