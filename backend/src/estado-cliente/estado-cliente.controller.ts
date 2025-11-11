import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstadoClienteService } from './estado-cliente.service';
import { CreateEstadoClienteDto } from './dto/create-estado-cliente.dto';
import { UpdateEstadoClienteDto } from './dto/update-estado-cliente.dto';

@Controller('estado-cliente')
export class EstadoClienteController {
  constructor(private readonly estadoClienteService: EstadoClienteService) {}

  @Post()
  create(@Body() createEstadoClienteDto: CreateEstadoClienteDto) {
    return this.estadoClienteService.create(createEstadoClienteDto);
  }

  @Get()
  getEstadoCliente() {
    return this.estadoClienteService.getEstadoCliente();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estadoClienteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstadoClienteDto: UpdateEstadoClienteDto) {
    return this.estadoClienteService.update(+id, updateEstadoClienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estadoClienteService.remove(+id);
  }
}
