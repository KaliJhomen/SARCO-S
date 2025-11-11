import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateClienteDto {
    @ApiProperty({
        description: 'Nombres del cliente',
        example: 'Luis Carlos'
    })
    @IsString()
    nombre: string;

    @ApiProperty({
        description: 'Id del tipo de documento',
        example: '1'
    })
    @IsNumber()
    idDocumento: number;

    @ApiProperty({
        description: 'Número del documento',
        example: '70412345'
    })
    @IsString()
    numeroDocumento: string;

    @ApiProperty({
        description: 'Dirección del cliente',
        example: 'Jr. Los Alamos 123'
    })
    @IsString()
    direccion: string;

    @ApiProperty({
        description: 'Referencia de la dirección',
        example: 'Cerca a la plaza'
    })
    @IsString()
    referencia: string;

    @ApiProperty({
        description: 'Dirección del DNI',
        example: 'Av. Los Alamos 456'
    })
    @IsString()
    direccionDni: string;

    @ApiProperty({
        description: 'Teléfono del cliente',
        example: '987654321'
    })
    @IsString()
    telefono: string;

    @ApiProperty({
        description: 'Email del cliente',
        example: 'ejemplo@gmail.com'
    })
    @IsString()
    email: string;

    @ApiProperty({
        description: 'Id del estado del cliente',
        example: '1'
    })
    @IsNumber()
    idEstadoCliente?: number;
}
