import { Router } from "express";
import  FuncionarioController from "../controllers/FuncionarioController";

class FuncionarioRoutes {
    router = Router();
    controller = new FuncionarioController();

    constructor() {
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
        this.router.get("/funcionario/:nome", this.controller.getByName);// com erro
        
        // Atualizar um funcionario
        
        // Deletar um funcionario

        // Deletar todos os funcionarios
    }
}

export default new FuncionarioRoutes().router;