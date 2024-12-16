"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../db/data_source");
const funcionario_1 = require("../models/funcionario");
class FuncionarioRepository {
    constructor() {
        this.funcionarioRepository = data_source_1.AppDataSource.getRepository(funcionario_1.Funcionario);
    }
    // criar um registro
    async save(funcionario) {
        try {
            return await this.funcionarioRepository.save(funcionario);
        }
        catch (error) {
            throw new Error('Falha ao salvar o funcionário');
        }
    }
    // ler muitos e um registro(todos, cpf, nome)
    async retrieveAll() {
        try {
            return await this.funcionarioRepository.query('select * from funcionario;');
        }
        catch (error) {
            throw new Error('Falha ao recuperar os funcionários');
        }
    }
    async retrieveByCpf(cpf_func) {
        try {
            return await this.funcionarioRepository.findOneBy({
                cpf_funcionario: cpf_func
            });
        }
        catch (error) {
            throw new Error('Falha ao recuperar o funcionário pelo CPF');
        }
    }
    // erro em buscar pelo nome
    async retrieveByName(name) {
        try {
            return await this.funcionarioRepository.find({
                where: {
                    nome: name
                }
            });
        }
        catch (error) {
            throw new Error('Falha ao recuperar o funcionário pelo nome');
        }
    }
    // atualizar um registro
    async update(funcionario) {
        const { cpf_funcionario, nome } = funcionario;
        try {
            return this.funcionarioRepository.save(funcionario);
        }
        catch (error) {
            throw new Error(`Falha ao atualizar o funcionário!`);
        }
    }
    // deletar um registro e todos
    async delete(cpf_func) {
        try {
            const funcionarioEncontrado = await this.funcionarioRepository.findOneBy({
                cpf_funcionario: cpf_func,
            });
            if (funcionarioEncontrado) {
                await this.funcionarioRepository.remove(funcionarioEncontrado);
                return 1;
            }
            return 0;
        }
        catch (error) {
            throw new Error('Falha ao deletar o funcionário!');
        }
    }
    async deleteAll(cpf_func) {
        try {
            let num = await this.funcionarioRepository.query('select count(cpf_funcionario) from funcionario;');
            this.funcionarioRepository.query('delete from funcionario;');
            return num;
        }
        catch (error) {
            throw new Error('Falha ao deletar todos os funcionários!');
        }
    }
}
exports.default = new FuncionarioRepository();
