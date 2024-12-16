import { AppDataSource } from "../db/data_source";
import { Funcionario } from "../models/funcionario";
import { getManager } from 'typeorm';

class FuncionarioRepository {
    funcionarioRepository = AppDataSource.getRepository(Funcionario);
    // criar um registro
    async save(funcionario: Funcionario): Promise<Funcionario> {
        try {
            return await this.funcionarioRepository.save(funcionario);
        } catch (error){
            throw new Error('Falha ao salvar o funcionário');
        }
    }
    

    // ler muitos e um registro(todos, cpf, nome)
    async retrieveAll(): Promise<Array<Funcionario>> {
        try {
            return await this.funcionarioRepository.query('select * from funcionario;');
        } catch (error){
            throw new Error('Falha ao recuperar os funcionários');
        }
    }

    async retrieveByCpf(cpf_func: string): Promise<Funcionario | null > {
        try {
            return await this.funcionarioRepository.findOneBy({
                cpf_funcionario: cpf_func
            })
        } catch (error) {
            throw new Error('Falha ao recuperar o funcionário pelo CPF');
        }
    }


    // atualizar um registro
    async update(funcionario: Funcionario): Promise<Funcionario> {
        const { cpf_funcionario, nome, cargo } = funcionario;
        try {
            return this.funcionarioRepository.save(funcionario);
        } catch (error) {
            throw new Error(`Falha ao atualizar o funcionário!`);
        }
    }

    async delete(cpf_func: string): Promise<string> {
        try {
            const result = await this.funcionarioRepository.query(
                'CALL delete_funcionario_by_cpf(?)',
                [cpf_func]
            );
    
            // Captura a mensagem retornada pela procedure
            const message = result[0][0].message;
            return message;
        } catch (error) {
            throw new Error('Falha ao deletar o funcionário!');
        }
    }
    

    // async deleteAll(): Promise<number> {
    //     try {
    //         const result = await this.funcionarioRepository.query('select count(cpf_funcionario) as total from funcionario;');
    //         const num: number = result[0]?.total || 0;
    //         this.funcionarioRepository.query('delete from funcionario;');
    //         return num;
    //     } catch (error) {
    //         throw new Error('Falha ao deletar todos os funcionários!');
    //     }
    // }


    async deleteAll(): Promise<number> { 
        try {
            // Chamar a procedure para deletar todos os funcionários e obter a quantidade deletada
            const result = await this.funcionarioRepository.query( 'SELECT COUNT(*) as total FROM funcionario;');
            const num: number = result[0]?.total || 0;
            await this.funcionarioRepository.query('CALL delete_all_funcionarios();');
            return num; // Retornar o número de funcionários deletados
        } catch (error) {
            throw new Error('Falha ao deletar todos os funcionários!');
        }
    }
    
}

export default new FuncionarioRepository();