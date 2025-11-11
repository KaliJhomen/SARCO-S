import { Module } from '@nestjs/common';
import { PagoSeparadoService } from './pago-separado.service';
import { PagoSeparadoController } from './pago-separado.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagoSeparado } from './entities/pago-separado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PagoSeparado])],
  controllers: [PagoSeparadoController],
  providers: [PagoSeparadoService],
})
export class PagoSeparadoModule {}
