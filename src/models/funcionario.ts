import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany, ManyToMany } from 'typeorm';
import { Cargo } from './cargo';
import { Agendamento } from './agendamento';
import { AgendamentoServicos } from './agendamento_servicos';

@Entity('funcionario')
export class Funcionario {
  @PrimaryColumn({ type: 'varchar', length: 14 })
  cpf_funcionario: string;

  @Column({ type: 'varchar', length: 45, nullable: false })
  nome: string;

  @ManyToOne(() => Cargo, (cargo) => cargo.funcionarios, {onUpdate: 'CASCADE', onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'cargo_cbo' })
  cargo?: Cargo;

  @OneToMany(() => Agendamento, (agendamento) => agendamento.funcionario, { cascade: true })
  agendamentos?: Agendamento[];

  @OneToMany(()=> AgendamentoServicos, (agendamentoservicos)=> agendamentoservicos.funcionario, {cascade: true})
  agendamentoservicos?: AgendamentoServicos[];

  constructor(cpf_func: string, name: string){
    this.cpf_funcionario = cpf_func;
    this.nome = name;
  }
}