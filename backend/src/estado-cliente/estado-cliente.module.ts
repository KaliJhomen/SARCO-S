import { Module } from '@nestjs/common';
import { EstadoClienteService } from './estado-cliente.service';
import { EstadoClienteController } from './estado-cliente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoCliente } from './entities/estado-cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EstadoCliente])],
  controllers: [EstadoClienteController],
  providers: [EstadoClienteService],
})
export class EstadoClienteModule {}
