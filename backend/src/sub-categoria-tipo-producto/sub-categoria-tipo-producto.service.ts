import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSubCategoriaTipoProductoDto } from './dto/create-sub-categoria-tipo-producto.dto';
import { UpdateSubCategoriaTipoProductoDto } from './dto/update-sub-categoria-tipo-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SubCategoriaTipoProducto } from './entities/sub-categoria-tipo-producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubCategoriaTipoProductoService {
  constructor(
      @InjectRepository(SubCategoriaTipoProducto)
      private subCategoriaTipoProductoRepository: Repository<SubCategoriaTipoProducto>,
    ) { }
  create(createSubCategoriaTipoProductoDto: CreateSubCategoriaTipoProductoDto) {
    return 'This action adds a new subCategoriaTipoProducto';
  }

  async findAll() {
      try {
        return await this.subCategoriaTipoProductoRepository.find();
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException(
          'Ocurrió un error al obtener las categorías',
        );
      }
    }

  findOne(id: number) {
    return `This action returns a #${id} subCategoriaTipoProducto`;
  }

  update(id: number, updateSubCategoriaTipoProductoDto: UpdateSubCategoriaTipoProductoDto) {
    return `This action updates a #${id} subCategoriaTipoProducto`;
  }

  remove(id: number) {
    return `This action removes a #${id} subCategoriaTipoProducto`;
  }
}
