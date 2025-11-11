import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateAgendaDto {
  @ApiProperty({
    description: 'Título de la agenda',
    example: 'Reunión semanal',
  })
  @IsString()
  titulo: string;

  @ApiProperty({
    description: 'Descripción de la agenda',
    example: 'Revisión de avances del proyecto con el equipo',
  })
  @IsString()
  descripcion: string;

  @ApiProperty({
    description: 'Fecha de la agenda en formato YYYY-MM-DD',
    example: '2025-10-05',
  })
  @IsString()
  fecha: string;

  @ApiProperty({
    description: 'Hora de la agenda en formato HH:mm',
    example: '14:30',
  })
  @IsString()
  hora: string;

  @ApiProperty({
    description: 'Tipo de tarea o actividad',
    example: 'Planificación',
  })
  @IsString()
  tipoTarea: string;

  @ApiProperty({
    description: 'Color asociado a la agenda',
    example: '#FF5733',
  })
  @IsString()
  color: string;

  @ApiProperty({
    type: Number,
    description: 'ID del usuario asignado a la agenda',
    example: 1,
  })
  @IsNumber()
  idUsuario: number;

  @ApiProperty({
    description: 'Estado de la agenda',
    example: 1,
  })
  @IsNumber()
  estado: number;
}
