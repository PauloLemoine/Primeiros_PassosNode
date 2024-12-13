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
        this.router.post("/cargo", this.controller.create);

        //Listar todos os cargos
        this.router.get("/cargos", this.controller.getAll);

        // Listar o pos cargo pesquisado
        this.router.get("/cargo/:cbo", this.controller.getByCbo);
    }
}

export default new CargoRoutes().router;