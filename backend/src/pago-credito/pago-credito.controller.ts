import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PagoCreditoService } from './pago-credito.service';
import { CreatePagoCreditoDto } from './dto/create-pago-credito.dto';
import { UpdatePagoCreditoDto } from './dto/update-pago-credito.dto';

@Controller('pago-credito')
export class PagoCreditoController {
  constructor(private readonly pagoCreditoService: PagoCreditoService) {}

  @Post()
  create(@Body() createPagoCreditoDto: CreatePagoCreditoDto) {
    return this.pagoCreditoService.create(createPagoCreditoDto);
  }

  @Get()
  getPagoCredito() {
    return this.pagoCreditoService.getPagoCredito();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pagoCreditoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePagoCreditoDto: UpdatePagoCreditoDto) {
    return this.pagoCreditoService.update(+id, updatePagoCreditoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pagoCreditoService.remove(+id);
  }
}
