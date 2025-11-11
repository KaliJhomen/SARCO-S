import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PagoSeparadoService } from './pago-separado.service';
import { CreatePagoSeparadoDto } from './dto/create-pago-separado.dto';
import { UpdatePagoSeparadoDto } from './dto/update-pago-separado.dto';

@Controller('pago-separado')
export class PagoSeparadoController {
  constructor(private readonly pagoSeparadoService: PagoSeparadoService) {}

  @Post()
  create(@Body() createPagoSeparadoDto: CreatePagoSeparadoDto) {
    return this.pagoSeparadoService.create(createPagoSeparadoDto);
  }

  @Get()
  getPagoSeparado() {
    return this.pagoSeparadoService.getPagoSeparado();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pagoSeparadoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePagoSeparadoDto: UpdatePagoSeparadoDto) {
    return this.pagoSeparadoService.update(+id, updatePagoSeparadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pagoSeparadoService.remove(+id);
  }
}
