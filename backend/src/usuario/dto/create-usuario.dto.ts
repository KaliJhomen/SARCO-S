export class CreateUsuarioDto {
    nombre: string;
    idDocumento: number;
    numeroDocumento: string;
    idCargo: number;
    direccion: string;
    telefono: string;
    email: string;
    login: string;
    clave: string;
    imagen: string;
    fondo: string;
    condicion?: number;
    idTienda:number;
}