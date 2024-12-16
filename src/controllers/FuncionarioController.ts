import { Request, Response } from "express";
import { Funcionario } from "../models/funcionario";
import { Cargo } from "../models/cargo";
import FuncionarioRepository from "../repositories/FuncionarioRepository";
import CargoRepository from "../repositories/CargoRepository";

export default class FuncionarioController {

    // funcionando
    async create(req: Request, res: Response) {
        const { cpf, nome, cbo_cargo } = req.body;

        if (!cpf) {
            res.status(400).send({ message: 'CPF é obrigatório!' });
            return;
        }

        if (!nome) {
            res.status(400).send({ message: 'Nome é obrigatório!' });
            return;
        }

        if (!cbo_cargo) {
            res.status(400).send({ message: 'CBO do cargo é obrigatório!' });
            return;
        }

        try {
            // Buscar o cargo com base no CBO fornecido
            const cargo = await CargoRepository.retrieveById(cbo_cargo);

            if (!cargo) {
                res.status(404).send({ message: 'Cargo não encontrado!' });
                return;
            }

            // Criar o objeto Funcionario com o cargo associado
            const funcionario = new Funcionario(cpf, nome);
            funcionario.cargo = cargo;

            // Salvar o funcionário
            const savedFunc = await FuncionarioRepository.save(funcionario);
            res.status(201).send(savedFunc);
        } catch (err) {
            res.status(500).send({
                message: `Erro ao salvar o funcionário`,
            });
        }
    }
   
   
    
    // funcionando
    async getAll(req: Request, res: Response) {
        try {
            const allFunc = await FuncionarioRepository.retrieveAll();
            if(!allFunc){
                res.status(404).send({ message: 'Nenhum funcionário encontrado!' });
                return;
            }
            res.status(200).send(allFunc);
        } catch (error) {
            res.status(500).send({
                message: 'Erro ao buscar os funcionários'
            });
        }
    }
    // funcionando
    async getByCpf(req: Request, res: Response){
        try {
            const cpf = req.params.cpf_func; // o que fica depois do "=" é o que deve estar na rota!
            const funcEncontrado = await FuncionarioRepository.retrieveByCpf(cpf);

            if(funcEncontrado){
                res.status(200).send(funcEncontrado);
            } else {
                res.status(404).send({ message: 'Funcionário não encontrado!' });
            }
        } catch (error) {
            res.status(500).send({
                message: 'Erro ao buscar o funcionário'
            });
        }
    }
    async updateNameFunc(req: Request, res: Response){
        const funcionario: Funcionario = req.body;
        funcionario.cpf_funcionario = req.params.cpf_func;
        funcionario.nome = req.body.nome;
        try {
            const funcionarioExistente = await FuncionarioRepository.retrieveByCpf(funcionario.cpf_funcionario);
            const funcionarioInexistente = funcionario.cpf_funcionario; 
            if(funcionarioExistente){
                await FuncionarioRepository.update(funcionario);
                res.send({
                    message: `Nome do funcionário com o cpf '${funcionario.cpf_funcionario}' atualizado para ${funcionario.nome}!`
                });
            } else {
                res.status(404).send({
                    message: `Funcionário com o cpf '${funcionarioInexistente}' não encontrado!`
                });
                return;
            }
        } catch (error) {
            res.status(500).send({
                message: 'Erro ao atualizar o nome do funcionário'
            });
        }
    }

    async updateCargoFunc(req: Request, res: Response){
        const funcionario: Funcionario = req.body;
        funcionario.cpf_funcionario = req.params.cpf_func;
        funcionario.cargo = req.body.cbo;
        const cargo: Cargo = req.body;
        try { 
            const funcionarioExistente = await FuncionarioRepository.retrieveByCpf(funcionario.cpf_funcionario);
            const novoCargo = await CargoRepository.retrieveById(cargo.cbo);
            const nomeFunc = await FuncionarioRepository.retrieveByCpf(funcionario.cpf_funcionario);
            const funcionarioInexistente = funcionario.cpf_funcionario; 
            
            if(!novoCargo){
                res.status(404).send({
                    message: `Cargo com o cbo '${cargo.cbo}' não encontrado!`
                });
                return;
            }

            if(funcionarioExistente){
                await FuncionarioRepository.update(funcionario);
                res.send({
                    message: `Cargo do funcionário '${nomeFunc?.nome}' com o cpf '${funcionario.cpf_funcionario}' atualizado para '${novoCargo?.nome}'!`
                });
            } else {
                res.status(404).send({
                    message: `Funcionário com o cpf '${funcionarioInexistente}' não encontrado!`
                });
                return;
            }
        } catch (error) {
            res.status(500).send({
                message: 'Erro ao atualizar o cargo do funcionário'
            });
        }
    }

    async deleteCpfFunc(req: Request, res: Response){
        const cpfFunc = req.params.cpf_func;
        const funcionarioExistente = await FuncionarioRepository.retrieveByCpf(cpfFunc);
        try {
            const funcionarioInexistente = cpfFunc;
            if(!funcionarioExistente){
                res.status(404).send({
                    message: `Funcionário com o cpf '${funcionarioInexistente}' não encontrado!`
                });
                return;
            } else {
                await FuncionarioRepository.delete(cpfFunc);
                res.send({
                    message: `Funcionário ${funcionarioExistente.nome} com o cpf '${funcionarioExistente.cpf_funcionario}' foi deletado!`
                });
            }
        } catch (error){
            res.status(500).send({
                message: `Erro ao deletar o funcionário ${funcionarioExistente?.nome} com o cpf ${funcionarioExistente?.cpf_funcionario}`
            });
        }
    }

    async deleteFunc(req: Request, res: Response){
        try {
            const num = await FuncionarioRepository.deleteAll();
            res.send({
                message: `Todos os ${num} funcionários foram deletados!`
            });
        } catch (error){
            res.status(500).send({
                message: 'Erro ao deletar todos os funcionários'
            });
        }
    }
}
