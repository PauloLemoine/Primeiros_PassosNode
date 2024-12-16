"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CargoRepository_1 = __importDefault(require("../repositories/CargoRepository"));
class CargoController {
    async create(req, res) {
        if (!req.body.cbo) {
            res.status(400).send({
                message: 'CBO é obrigatório!'
            });
            return;
        }
        else if (!req.body.nome) {
            res.status(400).send({
                message: 'Nome do cargo é obrigatório!'
            });
            return;
        }
        else if (!req.body.salario) {
            res.status(400).send({
                message: 'Salário é obrigatório!'
            });
            return;
        }
        try {
            const cargo = req.body;
            const savedcargo = await CargoRepository_1.default.save(cargo);
            res.status(201).send(savedcargo);
        }
        catch (err) {
            res.status(500).send({
                message: 'Erro ao salvar o cargo'
            });
        }
    }
    async getAll(req, res) {
        try {
            const allcargos = await CargoRepository_1.default.retrieveAll();
            if (!allcargos) {
                res.status(404).send({
                    message: 'Nenhum cargo encontrado'
                });
                return;
            }
            res.send(allcargos);
        }
        catch (err) {
            res.status(500).send({
                message: 'Erro ao buscar os cargos'
            });
        }
    }
    async getByCbo(req, res) {
        try {
            const cbo = req.params.cbo;
            const cargoEncontrado = await CargoRepository_1.default.retrieveById(cbo);
            if (cargoEncontrado) {
                res.status(200).send(cargoEncontrado);
            }
            else {
                res.status(404).send({
                    message: 'Cargo não encontrado'
                });
                return;
            }
        }
        catch (error) {
            res.status(500).send({
                message: 'Erro ao buscar o cargo'
            });
        }
    }
    async updateNameCargo(req, res) {
        const cargo = req.body;
        cargo.cbo = req.params.cbo;
        cargo.nome = req.params.nome;
        try {
            const cargoExistente = await CargoRepository_1.default.retrieveByName(cargo.nome);
            if (!cargoExistente)
                await CargoRepository_1.default.update(cargo);
            else
                res.send({
                    message: `Cargo  com o nome ${cargo.nome} já existe!`
                });
            res.send({
                message: `Cargo ${cargo.nome} atualizado com sucesso!`
            });
        }
        catch (err) {
            res.status(500).send({
                message: 'Erro ao atualizar o cargo'
            });
        }
    }
    async deleteCbo(req, res) {
        const cbo = req.params.cbo;
        try {
            const num = await CargoRepository_1.default.delete(cbo);
            if (num == 1) {
                res.send({
                    message: "Cargo deletado com sucesso!"
                });
            }
            else {
                res.send({
                    message: `Não foi possível deletar o cargo com o cbo: ${cbo}`
                });
            }
        }
        catch (error) {
            res.status(500).send({
                message: `O cargo com cbo: ${cbo}, não pode ser deletado.`
            });
        }
    }
    async deleteTodos(req, res) {
        try {
            const num = await CargoRepository_1.default.deleteAll();
        }
        catch (error) {
            res.status(500).send({
                message: "Não pode deletar todos os cargos!"
            });
        }
    }
}
exports.default = CargoController;
