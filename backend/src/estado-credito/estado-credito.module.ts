import { Module } from '@nestjs/common';
import { EstadoCreditoService } from './estado-credito.service';
import { EstadoCreditoController } from './estado-credito.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoCredito } from './entities/estado-credito.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EstadoCredito])],
  controllers: [EstadoCreditoController],
  providers: [EstadoCreditoService],
})
export class EstadoCreditoModule {}
