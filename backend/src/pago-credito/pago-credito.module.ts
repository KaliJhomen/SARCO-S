import { Module } from '@nestjs/common';
import { PagoCreditoService } from './pago-credito.service';
import { PagoCreditoController } from './pago-credito.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagoCredito } from './entities/pago-credito.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PagoCredito])],
  controllers: [PagoCreditoController],
  providers: [PagoCreditoService],
})
export class PagoCreditoModule {}
