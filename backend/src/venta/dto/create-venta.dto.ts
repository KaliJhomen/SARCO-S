export class CreateVentaDto {
    idUsuario: number;
    idCliente: number;
    idComprobante: number;
    idMetodoPago: number;
    numeroComprobante: string;
    fechaHora: Date;
    impuesto: string;
    totalVenta: string;
    idEstadoVenta?: number;
    garantiaTienda: string;
    descripcion: string;
    registrar: number;
    idTienda: number;
}
