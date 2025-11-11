import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SubCategoriaTipoProducto } from "src/sub-categoria-tipo-producto/entities/sub-categoria-tipo-producto.entity";
import { ProductoTipoProducto } from "src/producto-tipo-producto/entities/producto-tipo-producto.entity";

@Entity("tipo_producto", { schema: "sarcos_db" })
export class TipoProducto {
    @PrimaryGeneratedColumn({ type: "int", name: "id_tipo_producto" })
    idTipoProducto: number;

    @Column("varchar", { name: "nombre", nullable: true, length: 25 })
    nombre: string | null;

    @Column("boolean", { name: "estado", default: () => "'1'" })
    estado: boolean | null;

    @OneToMany(() => SubCategoriaTipoProducto, (subCategoriaTipoProducto) => subCategoriaTipoProducto.idTipoProducto2)
    sub_categoria_tipo_productos: SubCategoriaTipoProducto[];

    @OneToMany(() => ProductoTipoProducto, (productoTipoProducto) => productoTipoProducto.idTipoProducto2)
    producto_tipo_productos: ProductoTipoProducto[];

}