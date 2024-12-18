import { AppDataSource } from "../db/data_source";
import { Agendamento } from "../models/agendamento";

class AgendamentoRepository {
    agendamentoRepository = AppDataSource.getRepository(Agendamento);
     // criar um registro
    async save(agendamento: Agendamento): Promise<Agendamento> {
        try {
            this.agendamentoRepository.save(agendamento);
            return agendamento;
        } catch (error) {
            throw new Error('Erro ao realizar o agendamento');
        }
    }

    // criar agendamento com procedure
    async callCreateAgendamento(datas: string, horario: string, valorTotal: number, cliente_cpf: string, funcionario_cpf: string): Promise<void> {
        try {
            await this.agendamentoRepository.query(
                `CALL criar_agendamento(?, ?, ?, ?, ?);`,
                [datas, horario, valorTotal, cliente_cpf, funcionario_cpf]
            );
        } catch (error) {
            throw new Error('Erro ao chamar a procedure para criar agendamento');
        }
    }

    

     // ler muitos e um registro(todos, id)
    async retriveAll(): Promise<Array<Agendamento>> {
        try {
            return await this.agendamentoRepository.query('select * from agendamento;');
        } catch (error) {
            throw new Error('Erro ao buscar os agendamentos');
        }
    }
    
    
     async retrieveById(id_agendamento: number): Promise<Agendamento | null> {
        try {
            return await this.agendamentoRepository.findOneBy({
                id_agendamento: id_agendamento,
            });
        } catch (error) {
            throw new Error('Erro ao buscar o agendamento');
        }
    }

    // chamar procedure para buscar agendamento por ID
    async callRetrieveById(id_agendamento: number): Promise<Agendamento[]> {
        try {
            return await this.agendamentoRepository.query(
                `CALL buscar_agendamento_por_id(?);`,
                [id_agendamento]
            );
        } catch (error) {
            throw new Error('Erro ao chamar a procedure para buscar agendamento por ID');
        }
    }

     // atualizar um registro
     async update(agendamento: Agendamento) {
        const { datas, horario } = agendamento;
        try {
            this.agendamentoRepository.save(agendamento);
        } catch (error) {
            throw new Error('Erro ao atualizar o agendamento');
        }
     }
     // deletar um registro e todos
     async delete(id_agendamento: number): Promise<number> {
        try {
            const agendamentoEncontrado = await this.agendamentoRepository.findOneBy({
                id_agendamento: id_agendamento,
            })
            if (agendamentoEncontrado){
                await this.agendamentoRepository.remove(agendamentoEncontrado);
                return 1;
            }
            return 0;
        } catch (error) {
            throw new Error('Erro ao deletar o agendamento');
        }
    }

    async deleteAll(agendamento: Agendamento): Promise<number> {
        try {
            let num = await this.agendamentoRepository.query('select count(id_agendamento) from agendamento;');
            this.agendamentoRepository.query('delete from agendamento;');
            return num;
        } catch (error) {
            throw new Error ('Falha ao deletar todos os agendamentos');
        }
    }    
}

export default new AgendamentoRepository();