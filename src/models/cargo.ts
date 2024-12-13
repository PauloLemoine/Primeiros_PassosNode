import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { Funcionario } from "./funcionario";

@Entity("cargo")
export class Cargo {
    @PrimaryColumn({type: "varchar", length: 7})
    cbo: string;

    @Column({type: "varchar", length: 45, nullable: false, unique: true})
    nome: string;

    @Column( "decimal", {precision: 6, scale: 2, nullable: false})
    salario: number;

    @OneToMany(()=> Funcionario, (funcionario) => funcionario.cargo, {cascade: true})
    funcionarios?: Funcionario[];

    constructor(cbo: string, nome: string, salario: number){
        this.cbo = cbo;
        this.nome = nome;
        this.salario = salario;
    }
}