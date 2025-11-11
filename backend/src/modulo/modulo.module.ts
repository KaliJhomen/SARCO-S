import { Module } from '@nestjs/common';
import { ModuloService } from './modulo.service';
import { ModuloController } from './modulo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modulo } from './entities/modulo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Modulo])],
  controllers: [ModuloController],
  providers: [ModuloService],
})
export class ModuloModule {}
