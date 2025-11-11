import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TipoProducto } from "src/tipo-producto/entities/tipo-producto.entity";
import { Producto } from "src/producto/entities/producto.entity";

@Entity("producto_tipo_producto", { schema: "sarcos_db" })
export class ProductoTipoProducto {
    @PrimaryGeneratedColumn({ type: "int", name: "id_producto_tipo_producto" })
    idProductoTipoProducto: number;

    @Column("int", { name: "id_producto", nullable: false })
    idProducto: number | null;

    @Column("int", { name: "id_tipo_producto", nullable: false })
    idTipoProducto: number | null;

    @ManyToOne(() => TipoProducto, (tipoProducto) => tipoProducto.producto_tipo_productos, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    })
    @JoinColumn([{ name: "id_tipo_producto", referencedColumnName: "idTipoProducto" }])
    idTipoProducto2: TipoProducto;

    @ManyToOne(() => Producto, (producto) => producto.producto_tipo_productos, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    })
    @JoinColumn([{ name: "id_producto", referencedColumnName: "idProducto" }])
    idProducto2: Producto;
}
