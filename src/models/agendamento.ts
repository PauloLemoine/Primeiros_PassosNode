import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Cliente } from './cliente';
import { Funcionario } from './funcionario';
import { AgendamentoServicos } from './agendamento_servicos';

@Entity('agendamento')
export class Agendamento {
  @PrimaryGeneratedColumn({ type: 'int'})
  id_agendamento: number;

  @Column({ type: 'date' })
  datas: string;

  @Column({ type: 'time' })
  horario: string;

  @Column({ type: 'decimal', precision: 6, scale: 2 })
  valorTotal: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.agendamentos, { onUpdate: 'CASCADE', onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'cliente_cpf' })
  cliente: Cliente;

  @ManyToOne(() => Funcionario, (funcionario)=> funcionario.agendamentos, {onUpdate: 'CASCADE', onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'funcionario_cpf_funcionario' })
  funcionario: Funcionario;

  @OneToMany(()=> AgendamentoServicos, (agendamentoservicos) => agendamentoservicos.agendamento, {cascade: true})
  agendamentoservicos?: AgendamentoServicos[];

  constructor(id: number, data: string, horario: string, valorTotal: number, cliente: Cliente, funcionario: Funcionario){
    this.id_agendamento = id;
    this.datas = data;
    this.horario = horario;
    this.valorTotal = valorTotal;
    this.cliente = cliente;
    this.funcionario = funcionario;
  }
}
