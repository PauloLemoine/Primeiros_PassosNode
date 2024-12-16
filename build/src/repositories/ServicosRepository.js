"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../db/data_source");
const servicos_1 = require("../models/servicos");
class ServicosRepository {
    constructor() {
        this.servicosRepository = data_source_1.AppDataSource.getRepository(servicos_1.Servicos);
    }
    async save(servicos) {
        try {
            this.servicosRepository.save(servicos);
            return servicos;
        }
        catch (error) {
            throw new Error("Falha ao criar o serviço!");
        }
    }
    async retrieveAll() {
        try {
            return this.servicosRepository.query('select * from servicos;');
        }
        catch (error) {
            throw new Error("Falha ao recuperar os serviços!");
        }
    }
    async retrieveById(idserv) {
        try {
            return this.servicosRepository.findOneBy({
                idservicos: idserv,
            });
        }
        catch (error) {
            throw new Error("Falha ao encotrar o serviço!");
        }
    }
    async retrieveByName(name) {
        try {
            // A função findOne precisa do "where" para conseguir achar um atributo dentro da condição {nome: name}
            return this.servicosRepository.findOne({
                where: { nome: name },
            });
        }
        catch (error) {
            throw new Error("Falha ao encontrar o serviço!");
        }
    }
    async update(servicos) {
        const { nome, valor } = servicos;
        try {
            return this.servicosRepository.save(servicos);
        }
        catch (error) {
            throw new Error("Falha ao atualizar o serviço!");
        }
    }
    async delete(idserv) {
        try {
            const servicoEncontrado = await this.servicosRepository.findOneBy({
                idservicos: idserv,
            });
            if (servicoEncontrado) {
                await this.servicosRepository.remove(servicoEncontrado);
                return 1;
            }
            return 0;
        }
        catch (error) {
            throw new Error("Falha ao excluir o serviço!");
        }
    }
    async deleteAll() {
        try {
            let num = this.servicosRepository.query('select count(idservicos) from servicos;');
            this.servicosRepository.query('delete from servicos;');
            return num;
        }
        catch (error) {
            throw new Error("Falha ao excluir todos os serviços!");
        }
    }
}
exports.default = new ServicosRepository();
