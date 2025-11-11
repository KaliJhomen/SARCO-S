import { Module } from '@nestjs/common';
import { PenalidadesService } from './penalidades.service';
import { PenalidadesController } from './penalidades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Penalidades } from './entities/penalidade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Penalidades])],
  controllers: [PenalidadesController],
  providers: [PenalidadesService],
})
export class PenalidadesModule {}
