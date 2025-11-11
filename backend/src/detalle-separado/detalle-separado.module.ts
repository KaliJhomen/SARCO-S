import { Module } from '@nestjs/common';
import { DetalleSeparadoService } from './detalle-separado.service';
import { DetalleSeparadoController } from './detalle-separado.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleSeparado } from './entities/detalle-separado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetalleSeparado])],
  controllers: [DetalleSeparadoController],
  providers: [DetalleSeparadoService],
})
export class DetalleSeparadoModule {}
