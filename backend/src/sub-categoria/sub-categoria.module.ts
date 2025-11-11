import { Module } from '@nestjs/common';
import { SubCategoriaService } from './sub-categoria.service';
import { SubCategoriaController } from './sub-categoria.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategoria } from './entities/sub-categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubCategoria])],
  controllers: [SubCategoriaController],
  providers: [SubCategoriaService],
})
export class SubCategoriaModule {}