import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoColor } from './entities/producto-color.entity';
import { ProductoColorService } from './producto-color.service';
import { ProductoColorController } from './producto-color.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductoColor])],
  controllers: [ProductoColorController],
  providers: [ProductoColorService],
  exports: [ProductoColorService],
})
export class ProductoColorModule {}