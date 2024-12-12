import { AppDataSource } from "../db/data_source";
import { Servicos } from "../models/servicos";

class ServicosRepository {
    servicosRepository = AppDataSource.getRepository(Servicos);

    async save(servicos: Servicos): Promise<Servicos>{
        try{
            this.servicosRepository.save(servicos);
            return servicos;
        } catch (error) {
            throw new Error("Falha ao criar o serviço!");
        }
    }

    async retrieveAll(): Promise<Array<Servicos>>{
        try{
            return this.servicosRepository.query('select * from servicos;');
        } catch(error){
            throw new Error("Falha ao recuperar os serviços!");
        }
    }

    async retrieveById(idserv: number): Promise<Servicos | null>{
        try{
            return this.servicosRepository.findOneBy({
                idservicos: idserv,
            });
        } catch (error) {
            throw new Error ("Falha ao encotrar o serviço!");
        }
    }

    async retrieveByName(name: string): Promise<Servicos | null>{
        try{
            // A função findOne precisa do "where" para conseguir achar um atributo dentro da condição {nome: name}
            return this.servicosRepository.findOne({
                where: {nome: name},
            });
        } catch (error) {
            throw new Error("Falha ao encontrar o serviço!");
        }
    }

    async update(servicos: Servicos): Promise<Servicos | null>{
        const { nome, valor } = servicos;
        try{
            return this.servicosRepository.save(servicos);
        } catch (error) {
            throw new Error("Falha ao atualizar o serviço!");
        }
    }

    async delete(idserv: number): Promise<number>{
        try{
            const servicoEncontrado = await this.servicosRepository.findOneBy({
                idservicos: idserv,
            });
            if(servicoEncontrado){
                await this.servicosRepository.remove(servicoEncontrado);
                return 1;
            }
            return 0;
        } catch (error) {
            throw new Error("Falha ao excluir o serviço!");
        }
    }

    async deleteAll(): Promise<number>{
        try{
            let num = this.servicosRepository.query('select count(idservicos) from servicos;');
            this.servicosRepository.query('delete from servicos;');
            return num;
        } catch (error) {
            throw new Error("Falha ao excluir todos os serviços!");
        }   
    }
}

export default new ServicosRepository();