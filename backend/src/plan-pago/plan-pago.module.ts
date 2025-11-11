import { Module } from '@nestjs/common';
import { PlanPagoService } from './plan-pago.service';
import { PlanPagoController } from './plan-pago.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanPago } from './entities/plan-pago.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlanPago])],
  controllers: [PlanPagoController],
  providers: [PlanPagoService],
})
export class PlanPagoModule {}
