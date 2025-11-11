import { BadRequestException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) { }

  async create(createCategoriaDto: CreateCategoriaDto) {
    try {
      const newCategoria = this.categoriaRepository.create(createCategoriaDto);
      return await this.categoriaRepository.save(newCategoria);
    }
    catch (error) {
      throw new InternalServerErrorException(
        'Ocurrió un error al guardar la categoría'
      );
    }
  }

  async getCategorias() {
    try {
      return await this.categoriaRepository.find();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Ocurrió un error al obtener las categorías',
      );
    }
  }

  async getCategoria(id: number) {
    try {
      const categoriaFound = await this.categoriaRepository.findOne({ where: { idCategoria: id } });
      if (!categoriaFound) {
        throw new InternalServerErrorException('Categoría no encontrada');
      }
      return categoriaFound;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error interno al obtener la categoría',
      );
    }
  }

  async updateCategoria(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    try {
      const categoriaFound = await this.categoriaRepository.findOne({ where: { idCategoria: id } });

      if (!categoriaFound) {
        throw new NotFoundException('Categoría no encontrada');
      }
      const updatedCategoria = Object.assign(categoriaFound, updateCategoriaDto);
      return await this.categoriaRepository.save(updatedCategoria);

      // const categoria = await this.categoriaRepository.findOne({ where: { idCategoria: id } });

      // return categoria;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException('Ya existe una agenda con esos datos.');
      }
      throw new InternalServerErrorException('Error interno al actualizar la agenda.');
    }
  }

  async deleteCategoria(id: number) {
    try {
      const deleteResult = await this.categoriaRepository.delete(id);
      if (deleteResult.affected === 0) {
        throw new NotFoundException(`Categoría con ID ${id} no existe`);
      }

      return { message: `Categoría con ID ${id} eliminada correctamente` };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      // Errores de conexión a la base de datos
      if (error.code === 'ECONNREFUSED' || error.code === 'PROTOCOL_CONNECTION_LOST') {
        throw new InternalServerErrorException('No se pudo conectar a la base de datos.');
      }

      throw new InternalServerErrorException('Error interno al eliminar el cargo.');
    }
  }
}