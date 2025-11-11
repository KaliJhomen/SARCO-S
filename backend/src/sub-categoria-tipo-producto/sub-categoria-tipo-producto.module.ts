import { Module } from '@nestjs/common';
import { SubCategoriaTipoProductoService } from './sub-categoria-tipo-producto.service';
import { SubCategoriaTipoProductoController } from './sub-categoria-tipo-producto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategoriaTipoProducto } from './entities/sub-categoria-tipo-producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubCategoriaTipoProducto])],
  controllers: [SubCategoriaTipoProductoController],
  providers: [SubCategoriaTipoProductoService],
})
export class SubCategoriaTipoProductoModule {}
