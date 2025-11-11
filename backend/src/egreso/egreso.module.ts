import { Module } from '@nestjs/common';
import { EgresoService } from './egreso.service';
import { EgresoController } from './egreso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Egreso } from './entities/egreso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Egreso])],
  controllers: [EgresoController],
  providers: [EgresoService],
})
export class EgresoModule {}
