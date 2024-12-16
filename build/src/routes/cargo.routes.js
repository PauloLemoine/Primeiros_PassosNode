"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CargoController_1 = __importDefault(require("../controllers/CargoController"));
class CargoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new CargoController_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        // Criar cargo
        this.router.post("/cargo", this.controller.create); // erro "cbo obrigatório"
        //Listar todos os cargos
        this.router.get("/cargos", this.controller.getAll);
        // Listar o por cargo pesquisado
        this.router.get("/cargo/:cbo", this.controller.getByCbo);
        // Atualizar o nome do cargo com procedure
        this.router.put("/cargo/:cbo/:nome", this.controller.updateNameCargo);
        // Deletar os cargo pelo cbo
        this.router.delete("/delcargo/:cbo", this.controller.deleteCbo);
        // Deletar todos os cargos
    }
}
exports.default = new CargoRoutes().router;
