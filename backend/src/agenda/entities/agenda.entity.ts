import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Usuario } from "../../usuario/entities/usuario.entity";

@Index("idx_fecha", ["fecha"], {})
@Index("idx_usuario", ["idUsuario"], {})
@Index("idx_estado", ["estado"], {})
@Index("idx_fecha_hora", ["fecha", "hora"], {})
@Index("idx_tipo_tarea", ["tipoTarea"], {})
@Entity("agenda", { schema: "sarcos_db" })
export class Agenda {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "titulo", nullable: true, length: 255 })
  titulo: string | null;

  @Column("text", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @Column("date", { name: "fecha", nullable: true })
  fecha: string | null;

  @Column("time", { name: "hora", nullable: true })
  hora: string | null;

  @Column("varchar", { name: "tipo_tarea", nullable: true, length: 50 })
  tipoTarea: string | null;

  @Column("varchar", {
    name: "color",
    nullable: true,
    length: 7,
    default: () => "'#007bff'",
  })
  color: string | null;

  @Column("int", { name: "id_usuario", nullable: true })
  idUsuario: number | null;

  @Column("int", {
    name: "estado",
    nullable: true,
    width: 1,
    default: () => "'1'",
  })
  estado: number | null;

  @Column("timestamp", {
    name: "fecha_creacion",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaCreacion: Date | null;

  @Column("timestamp", {
    name: "fecha_actualizacion",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaActualizacion: Date | null;

  @ManyToOne(() => Usuario, (usuario) => usuario.agenda, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_usuario", referencedColumnName: "idUsuario" }])
  idUsuario2: Usuario;
}
