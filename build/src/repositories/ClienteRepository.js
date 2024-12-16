"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../db/data_source");
const cliente_1 = require("../models/cliente");
class ClienteRepository {
    constructor() {
        this.clienteRepository = data_source_1.AppDataSource.getRepository(cliente_1.Cliente);
    }
    async save(cliente) {
        try {
            this.clienteRepository.save(cliente);
            return cliente;
        }
        catch (err) {
            throw new Error("Falha ao criar o cliente!");
        }
    }
    async retrieveAll() {
        try {
            return this.clienteRepository.query('select * from cliente;');
        }
        catch (error) {
            throw new Error("Falha ao retornar os clientes!");
        }
    }
    async retrieveById(cpfcli) {
        try {
            return this.clienteRepository.findOneBy({
                cpf: cpfcli,
            });
        }
        catch (error) {
            throw new Error("Falha ao buscar o cliente!");
        }
    }
    async retrieveByName(name) {
        try {
            return this.clienteRepository.findOneBy({
                nome: name,
            });
        }
        catch (error) {
            throw new Error("Falha ao buscar o cliente!");
        }
    }
    async update(cliente) {
        const { cpf, nome } = cliente;
        try {
            this.clienteRepository.save(cliente);
        }
        catch (error) {
            throw new Error("Falha ao atualizar o cliente!");
        }
    }
    async delete(cpfcli) {
        try {
            const clienteEncontrado = await this.clienteRepository.findOneBy({
                cpf: cpfcli,
            });
            if (clienteEncontrado) {
                this.clienteRepository.remove(clienteEncontrado);
                return 1;
            }
            return 0;
        }
        catch (error) {
            throw new Error("Falha ao deletar o cliente!");
        }
    }
    async deleteAll() {
        try {
            let num = this.clienteRepository.query("select count(cpf) from cliente;");
            this.clienteRepository.query("delete from cliente;");
            return num;
        }
        catch (error) {
            throw new Error("Falha ao deletar todos os clientes!");
        }
    }
}
exports.default = new ClienteRepository();
