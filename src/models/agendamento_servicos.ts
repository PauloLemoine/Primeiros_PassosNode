// import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column, ManyToMany, JoinTable } from 'typeorm';
// import { Agendamento } from './agendamento';
// import { Servicos } from './servicos';
// import { Funcionario } from './funcionario';

// @Entity('agendamento_servicos')
// export class AgendamentoServicos {

//   @PrimaryColumn()
//   agendamento_id_agendamento: number;

//   @PrimaryColumn()
//   servicos_idservicos: number;

//   @ManyToOne(() => Agendamento, agendamento => agendamento.id_agendamento, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
//   @JoinColumn({ name: 'agendamento_id_agendamento' })
//   agendamento?: Agendamento;

//   @ManyToOne(() => Servicos, servico => servico.idservicos, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
//   @JoinColumn({ name: 'servicos_idservicos' })
//   servico?: Servicos;

//   @Column({ type: 'decimal', precision: 6, scale: 2 })
//   valorVenda: number;

//   @ManyToMany(() => Funcionario, funcionario => funcionario.agendamentoservicos)
//   funcionarios?: Funcionario[];

//   constructor(agendamento_id_agendamento: number, servicos_idservicos: number, valorVenda: number) {
//     this.agendamento_id_agendamento = agendamento_id_agendamento;
//     this.servicos_idservicos = servicos_idservicos;
//     this.valorVenda = valorVenda;
//   }
// }

// import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
// import { Agendamento } from './agendamento';
// import { Servicos } from './servicos';

// @Entity('agendamento_servicos')
// export class AgendamentoServicos {

//   @PrimaryColumn()
//   agendamento_id_agendamento: number;

//   @PrimaryColumn()
//   servicos_idservicos: number;

//   @ManyToOne(() => Agendamento, agendamento => agendamento.id_agendamento, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
//   @JoinColumn({ name: 'agendamento_id_agendamento' })
//   agendamento?: Agendamento;

//   @ManyToOne(() => Servicos, servico => servico.idservicos, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
//   @JoinColumn({ name: 'servicos_idservicos' })
//   servico?: Servicos;

//   @Column({ type: 'decimal', precision: 6, scale: 2 })
//   valorVenda: number;

//   constructor(agendamento_id_agendamento: number, servicos_idservicos: number, valorVenda: number) {
//     this.agendamento_id_agendamento = agendamento_id_agendamento;
//     this.servicos_idservicos = servicos_idservicos;
//     this.valorVenda = valorVenda;
//   }
// }

// import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
// import { Agendamento } from './agendamento';
// import { Servicos } from './servicos';

// @Entity('agendamento_servicos')
// export class AgendamentoServicos {

//   @PrimaryColumn()
//   agendamento_id_agendamento: number;

//   @PrimaryColumn()
//   servicos_idservicos: number;

//   @ManyToOne(() => Agendamento, agendamento => agendamento.id_agendamento, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
//   @JoinColumn({ name: 'agendamento_id_agendamento' })
//   agendamento?: Agendamento;

//   @ManyToOne(() => Servicos, servico => servico.idservicos, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
//   @JoinColumn({ name: 'servicos_idservicos' })
//   servico?: Servicos;

//   @Column({ type: 'decimal', precision: 6, scale: 2 })
//   valorVenda: number;

//   constructor(agendamento_id_agendamento: number, servicos_idservicos: number, valorVenda: number) {
//     this.agendamento_id_agendamento = agendamento_id_agendamento;
//     this.servicos_idservicos = servicos_idservicos;
//     this.valorVenda = valorVenda;
//   }
// }

import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column, ManyToMany } from 'typeorm';
import { Agendamento } from './agendamento';
import { Servicos } from './servicos';
import { Funcionario } from './funcionario';

@Entity('agendamento_servicos')
export class AgendamentoServicos {

  @PrimaryColumn()
  agendamento_id_agendamento: number;

  @PrimaryColumn()
  servicos_idservicos: number;

  @PrimaryColumn({ type: "varchar", length: 14 })
  funcionario_cpf_funcionario: string;

  @ManyToOne(() => Agendamento, agendamento => agendamento.id_agendamento, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'agendamento_id_agendamento' })
  agendamento?: Agendamento;

  @ManyToOne(() => Servicos, servico => servico.idservicos, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'servicos_idservicos' })
  servico?: Servicos;

  @ManyToOne(() => Funcionario, funcionario => funcionario.cpf_funcionario, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'funcionario_cpf_funcionario' })
  funcionario?: Funcionario;

  @Column({ type: 'decimal', precision: 6, scale: 2 })
  valorVenda: number;

  constructor(agendamento_id_agendamento: number, servicos_idservicos: number, funcionario_cpf_funcionario: string, quantidade: number, valorVenda: number) {
    this.agendamento_id_agendamento = agendamento_id_agendamento;
    this.servicos_idservicos = servicos_idservicos;
    this.funcionario_cpf_funcionario = funcionario_cpf_funcionario;
    this.valorVenda = valorVenda;
  }
}
