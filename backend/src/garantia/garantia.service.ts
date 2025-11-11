import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateGarantiaDto } from './dto/create-garantia.dto';
import { UpdateGarantiaDto } from './dto/update-garantia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Garantia } from './entities/garantia.entity';

@Injectable()
export class GarantiaService {
  constructor(
    @InjectRepository(Garantia)
    private readonly garantiaRepository: Repository<Garantia>,
  ) {}

  create(createGarantiaDto: CreateGarantiaDto) {
    if ((createGarantiaDto as any)?.idArticulo !== undefined) {
      throw new BadRequestException('Campo idArticulo no permitido. Use idProducto.');
    }
    if (createGarantiaDto?.idProducto === undefined || createGarantiaDto?.idProducto === null) {
      throw new BadRequestException('idProducto es requerido.');
    }
    const newGarantia = this.garantiaRepository.create(createGarantiaDto);
    return this.garantiaRepository.save(newGarantia);
  }

  getGarantias() {
    return this.garantiaRepository.find();
  }

  findAll() {
    return `This action returns all garantia`;
  }

  findOne(id: number) {
    return `This action returns a #${id} garantia`;
  }

  update(id: number, updateGarantiaDto: UpdateGarantiaDto) {
    if ((updateGarantiaDto as any)?.idArticulo !== undefined) {
      throw new BadRequestException('Campo idArticulo no permitido. Use idProducto.');
    }
    if ('idProducto' in (updateGarantiaDto as any) && (updateGarantiaDto as any).idProducto == null) {
      throw new BadRequestException('Si envía idProducto debe ser un valor válido.');
    }
    return `This action updates a #${id} garantia`;
  }

  remove(id: number) {
    return `This action removes a #${id} garantia`;
  }
}
