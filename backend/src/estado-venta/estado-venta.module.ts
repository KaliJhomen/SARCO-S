import { Module } from '@nestjs/common';
import { EstadoVentaService } from './estado-venta.service';
import { EstadoVentaController } from './estado-venta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoVenta } from './entities/estado-venta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EstadoVenta])],
  controllers: [EstadoVentaController],
  providers: [EstadoVentaService],
})
export class EstadoVentaModule {}
