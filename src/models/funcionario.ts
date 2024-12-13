// import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
// import { Cargo } from './cargo';
// import { AgendamentoServicos } from './agendamento_servicos';
// import { Agendamento } from './agendamento';

// @Entity('funcionario')
// export class Funcionario {

//   @PrimaryColumn({ type: 'varchar', length: 14 })
//   cpf_funcionario: string;

//   @Column({ type: 'varchar', length: 45, nullable: false })
//   nome: string;

//   @ManyToOne(() => Cargo, (cargo) => cargo.funcionarios, { onUpdate: 'CASCADE', onDelete: 'CASCADE', nullable: false })
//   @JoinColumn({ name: 'cargo_cbo' })
//   cargo?: Cargo;

//   @OneToMany(() => Agendamento, (agendamento) => agendamento.funcionario, { cascade: true })
//   agendamentos?: Agendamento[];

//   @ManyToMany(() => AgendamentoServicos, agendamentoservicos => agendamentoservicos.funcionarios)
//   @JoinTable({
//     name: 'agendamento_servicos_has_funcionario',
//     joinColumns: [
//       { name: 'funcionario_cpf_funcionario', referencedColumnName: 'cpf_funcionario' }
//     ],
//     inverseJoinColumns: [
//       { name: 'agendamento_servicos_agendamento_id_agendamento', referencedColumnName: 'agendamento_id_agendamento' },
//       { name: 'agendamento_servicos_servicos_idservicos', referencedColumnName: 'servicos_idservicos' }
//     ]
//   })
//   agendamentoservicos?: AgendamentoServicos[];

  
//   constructor(cpf_func: string, name: string) {
//     this.cpf_funcionario = cpf_func;
//     this.nome = name;
//   }
// }

// import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
// import { Cargo } from './cargo';
// import { Agendamento } from './agendamento';
// import { AgendamentoServicos } from './agendamento_servicos';

// @Entity('funcionario')
// export class Funcionario {

//   @PrimaryColumn({ type: 'varchar', length: 14 })
//   cpf_funcionario: string;

//   @Column({ type: 'varchar', length: 45, nullable: false })
//   nome: string;

//   @ManyToOne(() => Cargo, (cargo) => cargo.funcionarios, { onUpdate: 'CASCADE', onDelete: 'CASCADE', nullable: false })
//   @JoinColumn({ name: 'cargo_cbo' })
//   cargo?: Cargo;



//   // Relacionamento N:M com a tabela intermediária agendamento_servicos_has_funcionario
//   @ManyToMany(() => AgendamentoServicos, (agendamentoservicos) => agendamentoservicos.funcionario, { cascade: true })
//   @JoinTable({
//     name: 'agendamento_servicos_has_funcionario',  // Nome da tabela de junção
//     joinColumns: [
//       { name: 'funcionario_cpf_funcionario', referencedColumnName: 'cpf_funcionario' }
//     ],
//     inverseJoinColumns: [
//       { name: 'agendamento_servicos_agendamento_id_agendamento', referencedColumnName: 'agendamento_id_agendamento' },
//       { name: 'agendamento_servicos_servicos_idservicos', referencedColumnName: 'servicos_idservicos' }
//     ]
//   })
//   agendamentoservicos?: AgendamentoServicos[];

// }

// import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
// import { Cargo } from './cargo';
// import { Agendamento } from './agendamento';
// import { AgendamentoServicos } from './agendamento_servicos';

// @Entity('funcionario')
// export class Funcionario {

//   @PrimaryColumn({ type: 'varchar', length: 14 })
//   cpf_funcionario: string;

//   @Column({ type: 'varchar', length: 45, nullable: false })
//   nome: string;

//   @ManyToOne(() => Cargo, (cargo) => cargo.funcionarios, { onUpdate: 'CASCADE', onDelete: 'CASCADE', nullable: false })
//   @JoinColumn({ name: 'cargo_cbo' })
//   cargo?: Cargo;

//   @OneToMany(() => Agendamento, (agendamento) => agendamento.funcionario, { cascade: true })
//   agendamentos?: Agendamento[];

//   // Relação muitos para muitos com a tabela intermediária
//   @ManyToMany(() => AgendamentoServicos, (agendamentoservicos) => agendamentoservicos.funcionario, { cascade: true })
//   @JoinTable({
//     name: 'agendamento_servicos_has_funcionario',  // Nome da tabela de junção
//     joinColumns: [{ name: 'funcionario_cpf_funcionario', referencedColumnName: 'cpf_funcionario' }],
//     inverseJoinColumns: [{ name: 'agendamento_servicos_agendamento_id_agendamento', referencedColumnName: 'agendamento_id_agendamento' }]
//   })
//   agendamentoservicos?: AgendamentoServicos[];

//   constructor(cpf_func: string, name: string){
//     this.cpf_funcionario = cpf_func;
//     this.nome = name;
//   }
// }

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