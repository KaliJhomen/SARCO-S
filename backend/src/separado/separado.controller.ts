import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeparadoService } from './separado.service';
import { CreateSeparadoDto } from './dto/create-separado.dto';
import { UpdateSeparadoDto } from './dto/update-separado.dto';

@Controller('separado')
export class SeparadoController {
  constructor(private readonly separadoService: SeparadoService) {}

  @Post()
  create(@Body() createSeparadoDto: CreateSeparadoDto) {
    return this.separadoService.create(createSeparadoDto);
  }

  @Get()
  getSeparados() {
    return this.separadoService.getSeparados();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.separadoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeparadoDto: UpdateSeparadoDto) {
    return this.separadoService.update(+id, updateSeparadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.separadoService.remove(+id);
  }
}
