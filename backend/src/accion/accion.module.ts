import { Module } from '@nestjs/common';
import { AccionService } from './accion.service';
import { AccionController } from './accion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accion } from './entities/accion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Accion])],
  controllers: [AccionController],
  providers: [AccionService],
})
export class AccionModule {}
