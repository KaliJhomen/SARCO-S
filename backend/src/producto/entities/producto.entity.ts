import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Marca } from "../../marca/entities/marca.entity";
import { ProductoTienda } from "src/producto-tienda-producto/entities/producto-tienda-producto.entity";
import { DetalleCredito } from "../../detalle-credito/entities/detalle-credito.entity";
import { DetalleSeparado } from "../../detalle-separado/entities/detalle-separado.entity";
import { DetalleVenta } from "../../detalle-venta/entities/detalle-venta.entity";
import { Garantia } from "../../garantia/entities/garantia.entity";
import { ProductoTipoProducto } from "src/producto-tipo-producto/entities/producto-tipo-producto.entity";

@Index("fk_producto_marca_2", ["idMarca"], {})
@Entity("producto", { schema: "sarcos_db" })
export class Producto {
  @PrimaryGeneratedColumn({ type: "int", name: "id_producto" })
  idProducto: number;

  @Column("int", { name: "id_marca", nullable: true })
  idMarca: number | null;

  @Column("varchar", { name: "modelo", nullable: true, length: 255 })
  modelo: string | null;

  @Column("varchar", { name: "nombre", nullable: true, length: 255 })
  nombre: string | null;

  @Column("int", { name: "stock", nullable: true })
  stock: number | null;

  @Column("varchar", {
    name: "descripcion",
    nullable: true,
    comment: " ",
    length: 1024,
  })
  descripcion: string | null;

  @Column("varchar", { name: "imagen", nullable: true, length: 255 })
  imagen: string | null;

  @Column("decimal", {
    name: "precio_tope",
    nullable: true,
    precision: 20,
    scale: 2,
  })
  precioTope: number | null;

  @Column("decimal", {
    name: "precio_venta",
    nullable: true,
    precision: 20,
    scale: 2,
  })
  precio_venta: number | null;

  @Column("date", { name: "fecha_ingreso", nullable: true })
  fechaIngreso: string | null;

  @Column("date", { name: "garantia_fabrica", nullable: true })
  garantiaFabrica: string | null;

  @Column("int", { name: "descuento", nullable: true })
  descuento: number | null;

  @ManyToOne(() => Marca, (marca) => marca.productos, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_marca", referencedColumnName: "idMarca" }])
  idMarca2: Marca;

  @OneToMany(
    () => ProductoTienda,
    (productoTienda) => productoTienda.idProducto2
  )
  productoTiendas: ProductoTienda[];

  @OneToMany(
    () => DetalleCredito,
    (detalleCredito) => detalleCredito.idProducto2
  )
  detalleCreditos: DetalleCredito[];

  @OneToMany(
    () => DetalleSeparado,
    (detalleSeparado) => detalleSeparado.idProducto2
  )
  detalleSeparados: DetalleSeparado[];

  @OneToMany(() => DetalleVenta, (detalleVenta) => detalleVenta.idProducto2)
  detalleVentas: DetalleVenta[];

  @OneToMany(() => ProductoTipoProducto, (productoTipoProducto) => productoTipoProducto.idProducto2)
  producto_tipo_productos: ProductoTipoProducto[];
}
