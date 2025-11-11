import { Module } from '@nestjs/common';
import { IngresoService } from './ingreso.service';
import { IngresoController } from './ingreso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingreso } from './entities/ingreso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ingreso])],
  controllers: [IngresoController],
  providers: [IngresoService],
})
export class IngresoModule {}
