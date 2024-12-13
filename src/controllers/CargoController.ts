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
}