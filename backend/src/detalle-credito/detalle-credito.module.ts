import { Module } from '@nestjs/common';
import { DetalleCreditoService } from './detalle-credito.service';
import { DetalleCreditoController } from './detalle-credito.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleCredito } from './entities/detalle-credito.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetalleCredito])],
  controllers: [DetalleCreditoController],
  providers: [DetalleCreditoService],
})
export class DetalleCreditoModule {}
