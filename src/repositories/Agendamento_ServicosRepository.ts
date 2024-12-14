import { AppDataSource } from "../db/data_source";
import { AgendamentoServicos } from "../models/agendamento_servicos";

class Agendamento_ServicosRepository {
    agendamento_servicosrepository = AppDataSource.getRepository(AgendamentoServicos);

    async save(agendamentoserv: AgendamentoServicos): Promise<AgendamentoServicos> {
        try {
            this.agendamento_servicosrepository.save(agendamentoserv);
            return agendamentoserv;
        } catch (error) {
            throw new Error('Erro ao realizar o agendamento');
        }
    }
     // ler muitos e um registro(todos, id)
    async retriveAll(): Promise<Array<AgendamentoServicos>> {
        try {
            return await this.agendamento_servicosrepository.query('select * from agendamento_servicos;');
        } catch (error) {
            throw new Error('Erro ao buscar os agendamentos');
        }
    }
    
    
     async retrieveById(id_agendamento: number, idserv: number, cpf_func: string): Promise<AgendamentoServicos | null> {
        try {
            return await this.agendamento_servicosrepository.findOneBy({
                agendamento_id_agendamento: id_agendamento,
                servicos_idservicos: idserv,
                funcionario_cpf_funcionario: cpf_func,
            });
        } catch (error) {
            throw new Error('Erro ao buscar o agendamento');
        }
    }

     // atualizar um registro
     async update(agendamento: AgendamentoServicos) {
        const { servicos_idservicos } = agendamento;
        try {
            this.agendamento_servicosrepository.save(agendamento); // criar uma trigger que atualize o valor da venda ao mudar o serviço
        } catch (error) {
            throw new Error('Erro ao atualizar o agendamento');
        }
     }

     // deletar um registro e todos
     async delete(id_agendamento: number, idserv: number, cpf_func: string): Promise<number> {
        try {
            const agendamentoEncontrado = await this.agendamento_servicosrepository.findOneBy({
                agendamento_id_agendamento: id_agendamento,
                servicos_idservicos: idserv,
                funcionario_cpf_funcionario: cpf_func,
            })
            if (agendamentoEncontrado){
                await this.agendamento_servicosrepository.delete(agendamentoEncontrado);
                return 1;
            }
            return 0;
        } catch (error) {
            throw new Error('Erro ao deletar o agendamento');
        }
    }

    async deleteAll(agendamento: AgendamentoServicos): Promise<number> {
        try {
            let num = await this.agendamento_servicosrepository.query('select count(*) "Total de Agendamentos" from agendamento_servicos;');
            this.agendamento_servicosrepository.query('delete from agendamento_servicos;');
            return num;
        } catch (error) {
            throw new Error ('Falha ao deletar todos os agendamentos');
        }
    }
}

export default new Agendamento_ServicosRepository();