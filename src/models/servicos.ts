import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { AgendamentoServicos } from "./agendamento_servicos";

@Entity("servicos")
export class Servicos {
    @PrimaryGeneratedColumn({type: "int"})
    idservicos: number;

    @Column ({type: "varchar", length: 45, nullable: false})
    nome: string;

    @Column("decimal", {precision: 5, scale: 2, nullable: false})
    valor: number;

    @OneToMany(() => AgendamentoServicos, (agendamentoservicos) => agendamentoservicos.servico, {cascade: true})
    agendamentoservicos?:AgendamentoServicos[];

    constructor(id: number, nome: string, valor: number){
        this.idservicos = id;
        this.nome = nome;
        this.valor = valor;
    }
}