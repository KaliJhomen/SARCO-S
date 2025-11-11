import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Producto } from "../../producto/entities/producto.entity";
import { Cliente } from "./../../cliente/entities/cliente.entity";
import { Tienda } from "./../../tienda/entities/tienda.entity";
import { Usuario } from "./../../usuario/entities/usuario.entity";

@Index("FK_garantia_usuario", ["idUsuario"], {})
@Index("FK_garantia_cliente", ["idCliente"], {})
@Index("FK_garantia_producto", ["idProducto"], {})
@Index("FK_garantia_tienda", ["idTienda"], {})
@Entity("garantia", { schema: "sarcos_db" })
export class Garantia {
  @PrimaryGeneratedColumn({ type: "int", name: "id_garantia" })
  idGarantia: number;

  @Column("int", { name: "id_usuario", nullable: true })
  idUsuario: number | null;

  @Column("int", { name: "id_cliente", nullable: true })
  idCliente: number | null;

  @Column("int", { name: "id_producto", nullable: true })
  idProducto: number | null;

  @Column("int", { name: "id_tienda", nullable: true })
  idTienda: number | null;

  @Column("text", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @Column("date", { name: "fecha_ingreso" })
  fechaIngreso: string;

  @Column("date", { name: "fecha_devolucion", nullable: true })
  fechaDevolucion: string | null;

  @Column("enum", {
    name: "estado",
    nullable: true,
    enum: ["pendiente", "en_proceso", "finalizado", "cancelado"],
    default: "pendiente",   // ✅ sin comillas extras ni función
  })
  estado: "pendiente" | "en_proceso" | "finalizado" | "cancelado" | null;

  @ManyToOne(() => Producto, (producto) => producto.detalleVentas, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_producto", referencedColumnName: "idProducto" }])
  idProducto2: Producto;

  @ManyToOne(() => Cliente, (cliente) => cliente.garantias, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_cliente", referencedColumnName: "idCliente" }])
  idCliente2: Cliente;

  @ManyToOne(() => Tienda, (tienda) => tienda.garantias, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_tienda", referencedColumnName: "idTienda" }])
  idTienda2: Tienda;

  @ManyToOne(() => Usuario, (usuario) => usuario.garantias, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_usuario", referencedColumnName: "idUsuario" }])
  idUsuario2: Usuario;
}
