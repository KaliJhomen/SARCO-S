import { Column, Entity, ManyToOne, PrimaryColumn, JoinColumn, Index, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { Modulo } from "../../modulo/entities/modulo.entity";
import { Accion } from "../../accion/entities/accion.entity";

@Index("fk_usuario_permiso_usuario_1", ["idUsuario"], {})
@Index("fk_usuario_permiso_modulo_2", ["idModulo"], {})
@Index("fk_usuario_permiso_accion_3", ["idAccion"], {})
@Entity("usuario_permiso", { schema: "sarcos_db" })
export class UsuarioPermiso {
  @PrimaryGeneratedColumn({ type: "int", name: "id_usuario_permiso" })
  idRolPermiso: number;

  @Column("int", { name: "id_usuario", nullable: true })
  idUsuario: number;

  @Column("int", { name: "id_modulo", nullable: true })
  idModulo: number;

  @Column("int", { name: "id_accion", nullable: true })
  idAccion: number; 

  @Column("boolean", { name: "permitido", default: () => "true" })
  permitido: boolean;

  @ManyToOne(() => Usuario, (usuario) => usuario.permisos, { onDelete: "CASCADE" })
  @JoinColumn({ name: "id_usuario", referencedColumnName: "idUsuario" })
  usuario: Usuario;

  @ManyToOne(() => Modulo, (modulo) => modulo.permisosUsuarios, { onDelete: "CASCADE" })
  @JoinColumn({ name: "id_modulo", referencedColumnName: "idModulo" })
  modulo: Modulo;

  @ManyToOne(() => Accion, (accion) => accion.permisosUsuarios, { onDelete: "CASCADE" })
  @JoinColumn({ name: "id_accion", referencedColumnName: "idAccion" })
  accion: Accion;
}
