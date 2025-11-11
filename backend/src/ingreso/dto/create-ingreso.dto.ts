export class CreateIngresoDto {
    idUsuario: number;
    idTienda: number;
    tipoIngreso: string;
    montoIngreso: string;
    idMetodoPago: number;
    fechaHora: Date;
    numeroComprobante: string;
    estado: string;
}
