export class CreateServicioDto {
    idUsuario: number;
    idCliente: number;
    nombre: string;
    descripcion: string;
    fecha: string;
    idComprobante: number;
    idMetodoPago: number;
    precio: string;
    estado?: number;
    numeroComprobante: string;
}