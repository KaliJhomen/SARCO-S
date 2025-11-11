import { BadRequestException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { handleDBError } from '../common/execeptions/errors';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) { }

  async createCliente(createClienteDto: CreateClienteDto) {
    try {
      const newCliente = this.clienteRepository.create(createClienteDto);
      return await this.clienteRepository.save(newCliente);
    } catch (error) {
      handleDBError(error,'Ocurrió un error al guardar el cliente');
    }
  }

  async getClientes() {
    try {
      return await this.clienteRepository.find({
        relations: ['idDocumento2','idEstadoCliente2' ],
        select: {
          idDocumento2: {
            idDocumento: true,
            nombre: true
          },
          idEstadoCliente2: {
            nombre: true
          },
        },
      });
    } catch (error) {
      handleDBError(error,'Ocurrió un error al obtenert clientes');
    }
  }
  async getCliente(id: number) {
    try {
      const clienteFound = await this.clienteRepository.findOne({
        where: { idCliente: id },
        relations: ["idDocumento2"],
        select: {
          idDocumento2: {
            idDocumento: true,
            nombre: true
          },
        },
      });
      if (!clienteFound) {
        throw new NotFoundException('cliente no encontrado');
      }

      return clienteFound;
    }
    catch (error) {
      handleDBError(error,'Ocurrió un error al obtener el cliente');
    }
  }

  async updateCliente(idCliente: number, updateClienteDto: UpdateClienteDto) {
    try {
      const clienteFound = await this.clienteRepository.findOneBy({ idCliente });
      if (!clienteFound) {
        throw new NotFoundException(`Cliente con ID ${idCliente} no encontrado`);
      }
      const updatedCliente = Object.assign(clienteFound, updateClienteDto);
      return await this.clienteRepository.save(updatedCliente);
    } catch (error) {
      handleDBError(error,'Ocurrió un error al actualizar el cliente');
    }
  }

  async deleteCliente(idCliente: number) {
    try {
      const deleteResult = await this.clienteRepository.delete(idCliente);
      if (deleteResult.affected === 0) {
        throw new NotFoundException(`Cliente con ID ${idCliente} no encontrado`);
      }
      return { message: `Cliente con ID ${idCliente} eliminado correctamente` };
    } catch (error) {
      handleDBError(error,'Ocurrió un error al elimiar el cliente');
    }
  }
}
