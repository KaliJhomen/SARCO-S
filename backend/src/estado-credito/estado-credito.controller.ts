import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstadoCreditoService } from './estado-credito.service';
import { CreateEstadoCreditoDto } from './dto/create-estado-credito.dto';
import { UpdateEstadoCreditoDto } from './dto/update-estado-credito.dto';

@Controller('estado-credito')
export class EstadoCreditoController {
  constructor(private readonly estadoCreditoService: EstadoCreditoService) {}

  @Post()
  create(@Body() createEstadoCreditoDto: CreateEstadoCreditoDto) {
    return this.estadoCreditoService.create(createEstadoCreditoDto);
  }

  @Get()
  getEstadoCredito() {
    return this.estadoCreditoService.getEstadoCredito();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estadoCreditoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstadoCreditoDto: UpdateEstadoCreditoDto) {
    return this.estadoCreditoService.update(+id, updateEstadoCreditoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estadoCreditoService.remove(+id);
  }
}
