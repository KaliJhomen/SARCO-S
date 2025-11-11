import { Module } from '@nestjs/common';
import { TiendaService } from './tienda.service';
import { TiendaController } from './tienda.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tienda } from './entities/tienda.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tienda])],
  controllers: [TiendaController],
  providers: [TiendaService],
})
export class TiendaModule {}
