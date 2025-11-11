import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PenalidadesService } from './penalidades.service';
import { CreatePenalidadeDto } from './dto/create-penalidade.dto';
import { UpdatePenalidadeDto } from './dto/update-penalidade.dto';
import { Penalidades } from './entities/penalidade.entity';

@Controller('penalidades')
export class PenalidadesController {
  constructor(private readonly penalidadesService: PenalidadesService) {}

  @Post()
  create(@Body() createPenalidadeDto: CreatePenalidadeDto) {
    return this.penalidadesService.create(createPenalidadeDto);
  }

  @Get()
  getPenalidades(): Promise<Penalidades[]> {
    return this.penalidadesService.getPenalidades();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.penalidadesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePenalidadeDto: UpdatePenalidadeDto) {
    return this.penalidadesService.update(+id, updatePenalidadeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.penalidadesService.remove(+id);
  }
}
