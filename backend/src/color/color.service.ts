import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Color } from './entities/color.entity';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
  ) {}

  async create(createColorDto: CreateColorDto) {
    try{
      const color = this.colorRepository.create(createColorDto);
      return this.colorRepository.save(color);
    } catch(error){
      throw error;
    }  }

  async findAll() {
    try {
      return await this.colorRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(
        'Ocurrió un error al obtener los colores',
      );
    }  
  }
  async findOne(id: number){
    try {
      const color = await this.colorRepository.findOne({
        where: { idColor: id } 
      });

      if (!color) {
        throw new NotFoundException(`Color con ID ${id} no encontrado`);
      }
      return color;
    } catch (error) {      
      if (error instanceof NotFoundException) {
        throw error;
      }
      
      throw new InternalServerErrorException(
        `Error al obtener la marca con ID ${id}`,
      );
    } 
  }

  async update(id: number, updateColorDto: UpdateColorDto) {
    try {
      const color = await this.colorRepository.preload({
        idColor: id,
        ...updateColorDto,
      });
      if (!color) {
        throw new NotFoundException(`Color con ID ${id} no encontrado`);
      }
      return await this.colorRepository.save(color);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error al actualizar la color con ID ${id}`,
      );
    }  
  }

  async remove(id: number) {
      try {
      const color = await this.colorRepository.findOne({ where: { idColor: id } });
      if (!color) {
        throw new NotFoundException(`Color con ID ${id} no encontrado`);
      }
      await this.colorRepository.remove(color);
      return { message: `Color con ID ${id} eliminado correctamente` };
    } catch (error) {
      throw new InternalServerErrorException(
        `Error al eliminar el color con ID ${id}`,
      );
    }  
  }
}