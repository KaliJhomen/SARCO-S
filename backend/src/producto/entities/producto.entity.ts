import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Marca } from "../../marca/entities/marca.entity";
import { ProductoTienda } from "src/producto-tienda-producto/entities/producto-tienda-producto.entity";
import { DetalleCredito } from "../../detalle-credito/entities/detalle-credito.entity";
import { DetalleSeparado } from "../../detalle-separado/entities/detalle-separado.entity";
import { DetalleVenta } from "../../detalle-venta/entities/detalle-venta.entity";
import { Garantia} from "../../garantia/entities/garantia.entity";
import { ProductoTipoProducto } from "src/producto-tipo-producto/entities/producto-tipo-producto.entity";
import { ProductoColor } from "src/producto-color/entities/producto-color.entity";

@Index("fk_producto_marca_2", ["idMarca"], {})
@Entity("producto", { schema: "sarcos_db" })
export class Producto {
  @PrimaryGeneratedColumn({ type: "int", name: "id_producto" })
  idProducto: number;

  @Column("varchar", { name: "nombre", length: 255 })
  nombre: string ;
  
  @Column("varchar", { name: "modelo", length: 255 })
  modelo: string ;

  @Column("int", { name: "id_marca"})
  idMarca: number;

  @Column("varchar", { name: "descripcion", nullable: true, comment: " ", length: 1024,})
  descripcion: string | null;

  @Column("int", { name: "stock", default:0, nullable: true })
  stock: number | null;

  @Column("varchar", { name: "imagen", nullable: true, length: 255 })
  imagen: string | null;

  @Column("decimal", { name: "precio_tope", nullable: true, precision: 20, scale: 2,})
  precioTope: number | null;

  @Column("decimal", { name: "precio_venta", nullable: true, precision: 20, scale: 2,})
  precioVenta: number | null;

  @Column("tinyint", { name: "estado", nullable: true, default: () => "'1'" })
  estado: boolean | null;    

  @Column("date", { name: "fecha_ingreso", nullable: true })
  fechaIngreso: string | null;

  @Column("date", { name: "garantia_fabrica", nullable: true })
  garantiaFabrica: string | null;

  @Column("int", { name: "descuento", nullable: true })
  descuento: number | null;

  @ManyToOne(() => Marca, (marca) => marca.productos, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })

  @JoinColumn([{ name: "id_marca", referencedColumnName: "idMarca" }])
  idMarca2: Marca;
  
  @OneToMany(() => ProductoColor, (productoColor) => productoColor.producto)
  productoColores: ProductoColor[];
  
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
