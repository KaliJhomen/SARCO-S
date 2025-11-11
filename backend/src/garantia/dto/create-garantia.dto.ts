import { EstadoGarantia } from '../enums/estado-garantia.enum';

export class CreateGarantiaDto {
    idUsuario: number;
    idCliente: number;
    idProducto: number;
    idTienda: number;
    descripcion: string;
    fechaIngreso: string;
    fechaDevolucion: string;
    estado: "pendiente" | "en_proceso" | "finalizado" | "cancelado" | null;
}
