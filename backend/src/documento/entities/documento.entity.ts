import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from "../../cliente/entities/cliente.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";

@Entity("documento", { schema: "sarcos_db" })
export class Documento {
  @PrimaryGeneratedColumn({ type: "int", name: "id_documento" })
  idDocumento: number;

  @Column("varchar", { name: "nombre", nullable: true, length: 50 })
  nombre: string | null;

  @OneToMany(() => Cliente, (cliente) => cliente.idDocumento2)
  clientes: Cliente[];

  @OneToMany(() => Usuario, (usuario) => usuario.idDocumento2)
  usuarios: Usuario[];
}
