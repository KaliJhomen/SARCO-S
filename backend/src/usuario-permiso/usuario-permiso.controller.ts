import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioPermisoService } from './usuario-permiso.service';
import { CreateUsuarioPermisoDto } from './dto/create-usuario-permiso.dto';
import { UpdateUsuarioPermisoDto } from './dto/update-usuario-permiso.dto';

@Controller('usuario-permiso')
export class UsuarioPermisoController {
  constructor(private readonly usuarioPermisoService: UsuarioPermisoService) {}

  @Post()
  create(@Body() createUsuarioPermisoDto: CreateUsuarioPermisoDto) {
    return this.usuarioPermisoService.create(createUsuarioPermisoDto);
  }

  @Get()
  getUsuarioPermisos() {
    return this.usuarioPermisoService.getUsuarioPermisos();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioPermisoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioPermisoDto: UpdateUsuarioPermisoDto) {
    return this.usuarioPermisoService.update(+id, updateUsuarioPermisoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioPermisoService.remove(+id);
  }
}
