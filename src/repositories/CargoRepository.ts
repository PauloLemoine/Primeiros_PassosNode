import { AppDataSource } from "../db/data_source";
import { Cargo } from "../models/cargo";

class CargoRepository {
    cargoRepository = AppDataSource.getRepository(Cargo);

    async save(cargo: Cargo): Promise<Cargo> {
        try {
            this.cargoRepository.save(cargo);
            return cargo;
        } catch (err) {
            throw new Error ("Falha ao criar o cargo!");
        }
    }

    async retrieveAll(): Promise<Array<Cargo>> {
        try {
            return this.cargoRepository.query('select * from cargo;');
        } catch (error) {
            throw new Error("Falha ao retornar os cargos!");
        }
    }

    async retrieveById(cbofunc: string): Promise<Cargo | null> {
        try {
            return this.cargoRepository.findOneBy({
                cbo: cbofunc,
            });
        } catch (error) {
            throw new Error("Falha ao buscar o cargo!");
        }
    }

    async retrieveByName(name: string): Promise<Cargo | null> {
        try {
            return this.cargoRepository.findOneBy({
                nome: name,
            });
        } catch (error) {
            throw new Error("Falha ao buscar o cargo!");
        }
    }

    async update(cargo: Cargo) {
        const { cbo, nome } = cargo;
        try {
            this.cargoRepository.save(cargo);
        } catch (error) {
            throw new Error("Falha ao atualizar o cargo!");
        }
    }


    async updateNameProcedure(cargo: Cargo){
        const { cbo, nome } = cargo
        try {
            this.cargoRepository.query("CALL atualizar_nome_cargo(?,?)",
        [cargo.cbo, cargo.nome]);
        } catch (error) {
            throw new Error("Falha ao atualizar o cargo usando procedure!"); 
        }
    }

    async updateSalProcedure(cargo: Cargo){
        const { cbo, salario } = cargo
        try {
            this.cargoRepository.query("CALL atualizar_salario_cargo(?,?)", 
        [cargo.cbo, cargo.salario]);
        } catch (error) {
            throw new Error("Falha ao atualizar o cargo usando procedure!"); 
        }
    }

    async delete(cbofunc: string): Promise<number> {
        try {
            const cargoEncontrado = await this.cargoRepository.findOneBy({
                cbo: cbofunc,
            });
            if (cargoEncontrado) {
                this.cargoRepository.remove(cargoEncontrado);
                return 1;
            }
            return 0;
        } catch (error) {
            throw new Error("Falha ao deletar o cargo!");
        }
    }

    async deleteAll(): Promise<number> {
        try {
            const result = await this.cargoRepository.query("select count(cbo) as total from cargo");
            const num: number = result[0]?.total || 0;
            this.cargoRepository.query("delete from cargo;");
            return num;
        } catch (error) {
            throw new Error("Falha ao deletar todos os cargos!");
        }
    }
}

export default new CargoRepository();  