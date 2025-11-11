import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccionService } from './accion.service';
import { CreateAccionDto } from './dto/create-accion.dto';
import { UpdateAccionDto } from './dto/update-accion.dto';

@Controller('accion')
export class AccionController {
  constructor(private readonly accionService: AccionService) {}

  @Post()
  create(@Body() createAccionDto: CreateAccionDto) {
    return this.accionService.create(createAccionDto);
  }

  @Get()
  getAcciones() {
    return this.accionService.getAcciones();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccionDto: UpdateAccionDto) {
    return this.accionService.update(+id, updateAccionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accionService.remove(+id);
  }
}
