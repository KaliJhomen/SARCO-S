import { Module } from '@nestjs/common';
import { GarantiaService } from './garantia.service';
import { GarantiaController } from './garantia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Garantia } from './entities/garantia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Garantia])],
  controllers: [GarantiaController],
  providers: [GarantiaService],
})
export class GarantiaModule {}
