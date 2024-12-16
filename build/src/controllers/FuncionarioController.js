"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const funcionario_1 = require("../models/funcionario");
const FuncionarioRepository_1 = __importDefault(require("../repositories/FuncionarioRepository"));
const CargoRepository_1 = __importDefault(require("../repositories/CargoRepository"));
class FuncionarioController {
    async create(req, res) {
        const { cpf, nome, cbo_cargo } = req.body;
        if (!cpf) {
            res.status(400).send({ message: 'CPF é obrigatório!' });
            return;
        }
        if (!nome) {
            res.status(400).send({ message: 'Nome é obrigatório!' });
            return;
        }
        if (!cbo_cargo) {
            res.status(400).send({ message: 'CBO do cargo é obrigatório!' });
            return;
        }
        try {
            // Buscar o cargo com base no CBO fornecido
            const cargo = await CargoRepository_1.default.retrieveById(cbo_cargo);
            if (!cargo) {
                res.status(404).send({ message: 'Cargo não encontrado!' });
                return;
            }
            // Criar o objeto Funcionario com o cargo associado
            const funcionario = new funcionario_1.Funcionario(cpf, nome);
            funcionario.cargo = cargo;
            // Salvar o funcionário
            const savedFunc = await FuncionarioRepository_1.default.save(funcionario);
            res.status(201).send(savedFunc);
        }
        catch (err) {
            res.status(500).send({
                message: `Erro ao salvar o funcionário`,
            });
        }
    }
    async getAll(req, res) {
        try {
            const allFunc = await FuncionarioRepository_1.default.retrieveAll();
            if (!allFunc) {
                res.status(404).send({ message: 'Nenhum funcionário encontrado!' });
                return;
            }
            res.status(200).send(allFunc);
        }
        catch (error) {
            res.status(500).send({
                message: 'Erro ao buscar os funcionários'
            });
        }
    }
    async getByCpf(req, res) {
        try {
            const cpf = req.params.cpf_func;
            const funcEncontrado = await FuncionarioRepository_1.default.retrieveByCpf(cpf);
            if (funcEncontrado) {
                res.status(200).send(funcEncontrado);
            }
            else {
                res.status(404).send({ message: 'Funcionário não encontrado!' });
            }
        }
        catch (error) {
            res.status(500).send({
                message: 'Erro ao buscar o funcionário'
            });
        }
    }
    async getByName(req, res) {
        const nome = req.params.nome_func;
        try {
            const nomeEncontrado = await FuncionarioRepository_1.default.retrieveByName(nome);
            if (nomeEncontrado) {
                res.status(200).send(nomeEncontrado);
            }
            else {
                res.status(404).send({
                    message: `Não há funcionário com nome ${nome}`
                });
            }
        }
        catch (error) {
            res.status(500).send({
                message: `Erro ao buscar o(s) funcionário(s) com o nome ${nome}`
            });
        }
    }
}
exports.default = FuncionarioController;
