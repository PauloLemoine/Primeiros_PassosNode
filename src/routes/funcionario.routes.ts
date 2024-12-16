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
        this.router.post("/funcionario", this.controller.create); // http://localhost:8080/salaosenac/funcionario

        // Listar todos os funcionarios
        this.router.get("/funcionarios", this.controller.getAll);// http://localhost:8080/salaosenac/funcionarios

        //Buscar um funcionário pelo CPF
        this.router.get("/funcionario/:cpf_func", this.controller.getByCpf); // http://localhost:8080/salaosenac/funcionario/12345678901
        
        // Atualizar o Nome de um funcionario
        this.router.put("/UpdateNomefunc/:cpf_func", this.controller.updateNameFunc); // http://localhost:8080/salaosenac/UpdateNomefunc/12345678901

        // Atualizar o cargo de um funcionario
        this.router.put("/UpdateCargoFunc/:cpf_func", this.controller.updateCargoFunc); // http://localhost:8080/salaosenac/UpdateCargoFunc/12345678901

        // Deletar um funcionario
        this.router.delete("/Delfunc/:cpf_func", this.controller.deleteCpfFunc); // http://localhost:8080/salaosenac/Delfunc/12345678901
        
        // Deletar todos os funcionarios
        this.router.delete("/DelTodosFunc", this.controller.deleteFunc); // http://localhost:8080/salaosenac/DelTodosFunc
    }
}

export default new FuncionarioRoutes().router;