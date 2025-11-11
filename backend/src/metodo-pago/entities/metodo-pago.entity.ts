import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Credito } from "../../credito/entities/credito.entity";
import { Ingreso } from "../../ingreso/entities/ingreso.entity";
import { PagoCredito } from "../../pago-credito/entities/pago-credito.entity";
import { PagoSeparado } from "../../pago-separado/entities/pago-separado.entity";
import { Separado } from "../../separado/entities/separado.entity";
import { Servicio } from "../../servicio/entities/servicio.entity";
import { TicketCredito } from "../../ticket-credito/entities/ticket-credito.entity";
import { Venta } from "../../venta/entities/venta.entity";

@Entity("metodo_pago", { schema: "sarcos_db" })
export class MetodoPago {
  @PrimaryGeneratedColumn({ type: "int", name: "id_metodo_pago" })
  idMetodoPago: number;

  @Column("varchar", { name: "nombre", nullable: true, length: 255 })
  nombre: string | null;

  @OneToMany(() => Credito, (credito) => credito.idMetodoPago2)
  creditos: Credito[];

  @OneToMany(() => Ingreso, (ingreso) => ingreso.idMetodoPago2)
  ingresos: Ingreso[];

  @OneToMany(() => PagoCredito, (pagoCredito) => pagoCredito.idMetodoPago2)
  pagoCreditos: PagoCredito[];

  @OneToMany(() => PagoSeparado, (pagoSeparado) => pagoSeparado.idMetodoPago2)
  pagoSeparados: PagoSeparado[];

  @OneToMany(() => Separado, (separado) => separado.idMetodoPago2)
  separados: Separado[];

  @OneToMany(() => Servicio, (servicio) => servicio.idMetodoPago2)
  servicios: Servicio[];

  @OneToMany(
    () => TicketCredito,
    (ticketCredito) => ticketCredito.idMetodoPago2
  )
  ticketCreditos: TicketCredito[];

  @OneToMany(() => Venta, (venta) => venta.idMetodoPago2)
  ventas: Venta[];
}
