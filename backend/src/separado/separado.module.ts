import { Module } from '@nestjs/common';
import { SeparadoService } from './separado.service';
import { SeparadoController } from './separado.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Separado } from './entities/separado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Separado])],
  controllers: [SeparadoController],
  providers: [SeparadoService],
})
export class SeparadoModule {}
