import { AppDataSource } from "../db/data_source";
import { Cliente } from "../models/cliente"

class ClienteRepository {
    clienteRepository = AppDataSource.getRepository(Cliente);

    async save(cliente: Cliente): Promise<Cliente> {
        try {
            this.clienteRepository.save(cliente);
            return cliente;
        } catch (err) {
            throw new Error ("Falha ao criar o cliente!");
        }
    }

    async retrieveAll(): Promise<Array<Cliente>> {
        try {
            return this.clienteRepository.query('select * from cliente;');
        } catch (error) {
            throw new Error("Falha ao retornar os clientes!");
        }
    }

    async retrieveById(cpfcli: string): Promise<Cliente | null> {
        try {
            return this.clienteRepository.findOneBy({
                cpf: cpfcli,
            });
        } catch (error) {
            throw new Error("Falha ao buscar o cliente!");
        }
    }

    async retrieveByName(name: string): Promise<Cliente | null> {
        try {
            return this.clienteRepository.findOneBy({
                nome: name,
            });
        } catch (error) {
            throw new Error("Falha ao buscar o cliente!");
        }
    }

    async update(cliente: Cliente) {
        const { cpf, nome, senha } = cliente;
        try {
            this.clienteRepository.save(cliente);
        } catch (error) {
            throw new Error("Falha ao atualizar o cliente!");
        }
    }

    async delete(cpfcli: string): Promise<number> {
        try {
            const clienteEncontrado = await this.clienteRepository.findOneBy({
                cpf: cpfcli,
            });
            if (clienteEncontrado) {
                this.clienteRepository.remove(clienteEncontrado);
                return 1;
            }
            return 0;
        } catch (error) {
            throw new Error("Falha ao deletar o cliente!");
        }
    }

    async deleteAll(): Promise<number> {
        try {
            let num = this.clienteRepository.query("select count(cpf) from cliente;");
            this.clienteRepository.query("delete from cliente;");
            return num;
        } catch (error) {
            throw new Error("Falha ao deletar todos os clientes!");
        }
    }
}

export default new ClienteRepository();




  