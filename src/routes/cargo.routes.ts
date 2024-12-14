import { Router } from "express";
import  CargoController from "../controllers/CargoController";

class CargoRoutes {
    router = Router();
    controller = new CargoController();

    constructor() {
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

export default new CargoRoutes().router;