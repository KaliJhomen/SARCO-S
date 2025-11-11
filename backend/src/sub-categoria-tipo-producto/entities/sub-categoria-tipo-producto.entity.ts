import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TipoProducto } from "src/tipo-producto/entities/tipo-producto.entity";
import { SubCategoria } from "src/sub-categoria/entities/sub-categoria.entity";

@Entity("sub_categoria_tipo_producto", { schema: "sarcos_db" })
export class SubCategoriaTipoProducto {
    @PrimaryGeneratedColumn({ type: "int", name: "id_sub_categoria_tipo_producto" })
    idSubCategoriaTipoProducto: number;

    @Column("int", { name: "id_sub_categoria", nullable: true })
    idSubCategoria: number | null;

    @Column("int", { name: "id_tipo_producto", nullable: true })
    idTipoProducto: number | null;

    @ManyToOne(() => TipoProducto, (tipoProducto) => tipoProducto.sub_categoria_tipo_productos, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    })
    @JoinColumn([{ name: "id_tipo_producto", referencedColumnName: "idTipoProducto" }])
    idTipoProducto2: TipoProducto;

    @ManyToOne(() => SubCategoria, (subCategoria) => subCategoria.sub_categoria_tipo_productos, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    })
    @JoinColumn([{ name: "id_sub_categoria", referencedColumnName: "idSubCategoria" }])
    idSubCategoria2: SubCategoria;

}
