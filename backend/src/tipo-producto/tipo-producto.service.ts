import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTipoProductoDto } from './dto/create-tipo-producto.dto';
import { UpdateTipoProductoDto } from './dto/update-tipo-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoProducto } from './entities/tipo-producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TipoProductoService {
  constructor(
    @InjectRepository(TipoProducto)
    private TipoProductoRepository: Repository<TipoProducto>,
  ) { }
  create(createTipoProductoDto: CreateTipoProductoDto) {
    return 'This action adds a new tipoProducto';
  }

  async findAll() {
    try {
      return await this.TipoProductoRepository.find();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Ocurrió un error al obtener los tipos de producto',
      );
    }
  }

  async findAllFilteredBySubCategoria(subcategoriaId?: number) {
    try {
      if (subcategoriaId && Number(subcategoriaId) > 0) {
        const qb = this.TipoProductoRepository
          .createQueryBuilder('tipoProducto')
          .innerJoin('tipoProducto.sub_categoria_tipo_productos', 'sctp')
          .where('sctp.idSubCategoria = :subId', { subId: Number(subcategoriaId) });

        return await qb.getMany();
      }
      return await this.findAll();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Ocurrió un error al obtener los tipos de producto por subcategoría',
      );
    }
  }
  findOne(id: number) {
    return `This action returns a #${id} tipoProducto`;
  }

  update(id: number, updateTipoProductoDto: UpdateTipoProductoDto) {
    return `This action updates a #${id} tipoProducto`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoProducto`;
  }
}