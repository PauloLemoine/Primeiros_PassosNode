"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../db/data_source");
const agendamento_servicos_1 = require("../models/agendamento_servicos");
class Agendamento_ServicosRepository {
    constructor() {
        this.agendamento_servicosrepository = data_source_1.AppDataSource.getRepository(agendamento_servicos_1.AgendamentoServicos);
    }
    async save(agendamentoserv) {
        try {
            this.agendamento_servicosrepository.save(agendamentoserv);
            return agendamentoserv;
        }
        catch (error) {
            throw new Error('Erro ao realizar o agendamento');
        }
    }
    // ler muitos e um registro(todos, id)
    async retriveAll() {
        try {
            return await this.agendamento_servicosrepository.query('select * from agendamento_servicos;');
        }
        catch (error) {
            throw new Error('Erro ao buscar os agendamentos');
        }
    }
    async retrieveById(id_agendamento, idserv, cpf_func) {
        try {
            return await this.agendamento_servicosrepository.findOneBy({
                agendamento_id_agendamento: id_agendamento,
                servicos_idservicos: idserv,
                funcionario_cpf_funcionario: cpf_func,
            });
        }
        catch (error) {
            throw new Error('Erro ao buscar o agendamento');
        }
    }
    // atualizar um registro
    async update(agendamento) {
        const { servicos_idservicos } = agendamento;
        try {
            this.agendamento_servicosrepository.save(agendamento); // criar uma trigger que atualize o valor da venda ao mudar o serviço
        }
        catch (error) {
            throw new Error('Erro ao atualizar o agendamento');
        }
    }
    // deletar um registro e todos
    async delete(id_agendamento, idserv, cpf_func) {
        try {
            const agendamentoEncontrado = await this.agendamento_servicosrepository.findOneBy({
                agendamento_id_agendamento: id_agendamento,
                servicos_idservicos: idserv,
                funcionario_cpf_funcionario: cpf_func,
            });
            if (agendamentoEncontrado) {
                await this.agendamento_servicosrepository.delete(agendamentoEncontrado);
                return 1;
            }
            return 0;
        }
        catch (error) {
            throw new Error('Erro ao deletar o agendamento');
        }
    }
    async deleteAll(agendamento) {
        try {
            let num = await this.agendamento_servicosrepository.query('select count(*) "Total de Agendamentos" from agendamento_servicos;');
            this.agendamento_servicosrepository.query('delete from agendamento_servicos;');
            return num;
        }
        catch (error) {
            throw new Error('Falha ao deletar todos os agendamentos');
        }
    }
}
exports.default = new Agendamento_ServicosRepository();
