export class CreateTicketCreditoDto {
    idUsuario: number;
    idTienda: number;
    idCredito: number;
    idMetodoPago: number;
    fechaPago: Date;
    montoPago: string;
    numComprobante: string;
    deudaRestante: string;
}
