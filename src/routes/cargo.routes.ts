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
        this.router.post("/cargo", this.controller.create); // http://localhost:8080/salaosenac/cargo

        //Listar todos os cargos
        this.router.get("/cargos", this.controller.getAll); //http://localhost:8080/salaosenac/cargos 

        // Listar o por cargo pesquisado
        this.router.get("/cargo/:cbo", this.controller.getByCbo); // http://localhost:8080/salaosenac/cargo/5141-05

        // Atualizar o nome do cargo com procedure
        this.router.put("/AtualizaNomecargo/:cbo", this.controller.updateNameCargo); //http://localhost:8080/salaosenac/AtualizaNomecargo/5141-05

        // Atualizar salario do cargo
        this.router.put("/AtualizaSalcargo/:cbo", this.controller.updateSalCargo); //http://localhost:8080/salaosenac/AtualizaSalcargo/5141-30

        // Deletar os cargo pelo cbo
        this.router.delete("/delcargo/:cbo", this.controller.deleteCbo); // http://localhost:8080/salaosenac/delcargo/5141-05

        // Deletar todos os cargos
        this.router.delete("/delcargos", this.controller.deleteTodos); //http://localhost:8080/salaosenac/delcargos
    }
}

export default new CargoRoutes().router;