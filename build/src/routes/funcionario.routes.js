"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FuncionarioController_1 = __importDefault(require("../controllers/FuncionarioController"));
class FuncionarioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new FuncionarioController_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        // Criar funiconario
        this.router.post("/funcionario", this.controller.create);
        // Listar todos os funcionarios
        this.router.get("/funcionarios", this.controller.getAll);
        //Buscar um funcionário pelo CPF
        this.router.get("/funcionario/:cpf", this.controller.getByCpf);
        // Buscar um funcionário pelo nome
        this.router.get("/funcionario/:nome", this.controller.getByName); // com erro
        // Atualizar um funcionario
        // Deletar um funcionario
        // Deletar todos os funcionarios
    }
}
exports.default = new FuncionarioRoutes().router;
