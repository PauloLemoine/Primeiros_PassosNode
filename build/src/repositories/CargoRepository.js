"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../db/data_source");
const cargo_1 = require("../models/cargo");
class CargoRepository {
    constructor() {
        this.cargoRepository = data_source_1.AppDataSource.getRepository(cargo_1.Cargo);
    }
    async save(cargo) {
        try {
            this.cargoRepository.save(cargo);
            return cargo;
        }
        catch (err) {
            throw new Error("Falha ao criar o cargo!");
        }
    }
    async retrieveAll() {
        try {
            return this.cargoRepository.query('select * from cargo;');
        }
        catch (error) {
            throw new Error("Falha ao retornar os cargos!");
        }
    }
    async retrieveById(cbofunc) {
        try {
            return this.cargoRepository.findOneBy({
                cbo: cbofunc,
            });
        }
        catch (error) {
            throw new Error("Falha ao buscar o cargo!");
        }
    }
    async retrieveByName(name) {
        try {
            return this.cargoRepository.findOneBy({
                nome: name,
            });
        }
        catch (error) {
            throw new Error("Falha ao buscar o cargo!");
        }
    }
    async update(cargo) {
        const { cbo, nome } = cargo;
        try {
            this.cargoRepository.save(cargo);
        }
        catch (error) {
            throw new Error("Falha ao atualizar o cargo!");
        }
    }
    async updateNameProcedure(cargo) {
        const { cbo, nome } = cargo;
        try {
            this.cargoRepository.query("CALL atualizar_nome_cargo(?,?)", [cargo.cbo, cargo.nome]);
        }
        catch (error) {
            throw new Error("Falha ao atualizar o cargo usando procedure!");
        }
    }
    async delete(cbofunc) {
        try {
            const cargoEncontrado = await this.cargoRepository.findOneBy({
                cbo: cbofunc,
            });
            if (cargoEncontrado) {
                this.cargoRepository.remove(cargoEncontrado);
                return 1;
            }
            return 0;
        }
        catch (error) {
            throw new Error("Falha ao deletar o cargo!");
        }
    }
    async deleteAll() {
        try {
            this.cargoRepository.query("delete from cargo;");
            return 1;
        }
        catch (error) {
            throw new Error("Falha ao deletar todos os cargos!");
        }
    }
}
exports.default = new CargoRepository();
