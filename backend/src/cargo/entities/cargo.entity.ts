import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "../../usuario/entities/usuario.entity";

@Entity("cargo", { schema: "sarcos_db" })
export class Cargo {
  @PrimaryGeneratedColumn({ type: "int", name: "id_cargo" })
  idCargo: number;

  @Column("varchar", { name: "nombre", nullable: true, length: 255 })
  nombre: string | null;

  @OneToMany(() => Usuario, (usuario) => usuario.idCargo2)
  usuarios: Usuario[];
}
