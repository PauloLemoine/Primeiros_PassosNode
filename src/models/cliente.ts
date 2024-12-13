import { Entity, PrimaryColumn, Column, OneToMany} from "typeorm";
import { Agendamento } from "./agendamento";

@Entity("cliente")
export class Cliente {
  @PrimaryColumn({ type: "varchar", length: 14 })
  cpf: string;

  @Column({ type: "varchar", length: 45, nullable: false })
  nome: string;


  @OneToMany(() => Agendamento, (agendamento) => agendamento.cliente, { cascade: true })
  agendamentos?: Agendamento[];

  constructor(cpf: string, nome: string, senha: string) {
    this.cpf = cpf;
    this.nome = nome;
  }
}
