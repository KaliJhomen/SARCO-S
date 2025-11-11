export class CreatePagoCreditoDto {
    idPlanPago: number;
    fechaPago: Date;
    montoPago: string;
    idUsuario: number;
    idTienda: number;
    idMetodoPago: number;
    numComprobante: string;
    deudaRestante: string;
}
