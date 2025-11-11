import { Module } from '@nestjs/common';
import { ProductoTiendaProductoService } from './producto-tienda-producto.service';
import { ProductoTiendaProductoController } from './producto-tienda-producto.controller';

@Module({
  controllers: [ProductoTiendaProductoController],
  providers: [ProductoTiendaProductoService],
})
export class ProductoTiendaProductoModule {}
