import { Request, Response } from "express";
import { Cargo } from "../models/cargo";
import CargoRepository from "../repositories/CargoRepository";

export default class CargoController{
    async create(req: Request, res: Response){
            if(!req.body.cbo){
                res.status(400).send({
                    message: 'CBO é obrigatório!'
                });
                return;
            }
            else if (!req.body.nome){
                res.status(400).send({
                    message: 'Nome do cargo é obrigatório!'
                });
                return;
            } else if (!req.body.salario){
                res.status(400).send({
                    message: 'Salário é obrigatório!'
                }); 
                return;
            }
    
            try{
                const cargo: Cargo = req.body;
                const savedcargo = await CargoRepository.save(cargo);
                res.status(201).send(savedcargo);
            } catch (err) {
                res.status(500).send({
                    message: 'Erro ao salvar o cargo'
                });
            }
    }

    async getAll(req: Request, res: Response){
        try{
            const allcargos = await CargoRepository.retrieveAll();
            if(!allcargos){
                res.status(404).send({
                    message: 'Nenhum cargo encontrado'
                });
                return;
            }
            res.send(allcargos);
        } catch (err) {
            res.status(500).send({
                message: 'Erro ao buscar os cargos'
            });
        }
    }

    async getByCbo(req: Request, res: Response){
        try{
            const cbo = req.params.cbo;
            const cargoEncontrado = await CargoRepository.retrieveById(cbo);

            if(cargoEncontrado){
                res.status(200).send(cargoEncontrado);
            } else {
                res.status(404).send({
                    message: 'Cargo não encontrado'
                });
                return;
            }
        } catch (error) {
            res.status(500).send({
                message: 'Erro ao buscar o cargo'
            });
        }
    }

    async updateNameCargo(req: Request, res: Response){
        const cargo: Cargo = req.body;
        cargo.cbo =  req.params.cbo;
        cargo.nome = req.body.nome
        try {
            const novoNome = cargo.nome;
            const nomeCargoExistente = await CargoRepository.retrieveByName(cargo.nome); // nome existe
            const cargoExistente = await CargoRepository.retrieveById(cargo.cbo); // cbo existe

            if (nomeCargoExistente?.nome == novoNome){
                res.send({
                    message: `Cargo com o nome ${nomeCargoExistente.nome} já existe!`
                });
                return;
            }

            if(cargoExistente){ 
                await CargoRepository.updateNameProcedure(cargo);
                res.send({
                    message: `Cargo ${cargoExistente.nome} com o cbo '${cargoExistente.cbo}' foi atualizado para ${novoNome} com sucesso!`
                });
            } else {
                res.send({
                    message: `O cargo com o cbo '${cargo.cbo}' não existe!`
                });
                return;
            }

        } catch (err){
            res.status(500).send({
                message: `Erro ao atualizar o cargo com o cbo ${cargo.cbo}`
            });
        }
    }


    async updateSalCargo(req: Request, res: Response){
        const cargo: Cargo = req.body
        cargo.cbo =  req.params.cbo;
        cargo.salario = req.body.salario;
        try {
            const cargoExistente = await CargoRepository.retrieveById(cargo.cbo);

            if(cargoExistente){
                await CargoRepository.updateSalProcedure(cargo);
                res.send({
                    message: `Salário do Cargo de ${cargoExistente.nome} atualizado para R$${cargo.salario}`
                });
            } else {
                res.send ({
                    message: `Cargo não encontrado com o cbo '${cargo.cbo}'`
                })
            }
        } catch (error) {
            res.status(500).send({
                message: `Erro ao atualizar o salário do cargo com o cbo ${cargo.cbo}`
            });
        }
    }

    async deleteCbo(req: Request, res: Response){
        const cbo = req.params.cbo;
        try {
            const cargoExistente = await CargoRepository.retrieveById(cbo);
            const cargoInexistente = cbo;
            if(!cargoExistente){
                res.send({
                    message: `Cargo com o cbo '${cargoInexistente}' não foi encontrado!`
                });
                return;  // caso o cargo não exista, não precisa continuar a execução do método.
            } 
            if(cargoExistente) {
                const num = await CargoRepository.delete(cbo)
                if (num == 1) {
                    res.send({
                        message: `O Cargo ${cargoExistente.nome} com o cbo '${cargoExistente.cbo}' foi deletado com sucesso!`
                    });
                } else {
                    res.send ({
                        message: `Não foi possível deletar o cargo ${cargoExistente.nome} com o cbo: ${cbo}`
                    });
                }
            }
        } catch (error) {
            res.status(500).send({
                message: `O cargo com cbo: ${cbo}, não pode ser deletado.`
            });
        }
    }

    async deleteTodos(req: Request, res: Response){
        try {
            const num = await CargoRepository.deleteAll();
            
            if (num == 0) {
                res.send({
                    message: "Nenhum cargo encontrado para deletar."
                });
                return; // caso não existam cargos, não precisa continuar a execução do método.
            } else {
                res.send({
                    message: `Todos os ${num} cargos foram deletados com sucesso!`
                });
            }
        } catch (error) {
            res.status(500).send({
                message: "Erro ao deletar todos os cargos!"
            });
        }
    }
}