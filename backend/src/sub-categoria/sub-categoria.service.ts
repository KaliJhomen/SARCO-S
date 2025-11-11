import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSubCategoriaDto } from './dto/create-sub-categoria.dto';
import { UpdateSubCategoriaDto } from './dto/update-sub-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubCategoria } from './entities/sub-categoria.entity';

@Injectable()
export class SubCategoriaService {
  constructor(
    @InjectRepository(SubCategoria)
    private subCategoriaRepository: Repository<SubCategoria>,
  ) { }
  create(createSubCategoriaDto: CreateSubCategoriaDto) {
    return 'This action adds a new subCategoria';
  }

  async findAll(categoriaId?: number) {
    try {
      if (categoriaId && Number(categoriaId) > 0) {
        return await this.subCategoriaRepository.find({ where: { idCategoria: Number(categoriaId) } });
      }
      return await this.subCategoriaRepository.find();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Ocurrió un error al obtener las subcategorías',
      );
    }
  }
  findOne(id: number) {
    return `This action returns a #${id} subCategoria`;
  }

  update(id: number, updateSubCategoriaDto: UpdateSubCategoriaDto) {
    return `This action updates a #${id} subCategoria`;
  }

  remove(id: number) {
    return `This action removes a #${id} subCategoria`;
  }
}