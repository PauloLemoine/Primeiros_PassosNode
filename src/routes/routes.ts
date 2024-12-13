import { Application } from "express";
import cargoRoutes from "./cargo.routes";
import funcionarioRoutes from "./funcionario.routes";

export default class Routes {
    constructor(app: Application){
        app.use("/salaosenac", funcionarioRoutes);
        app.use("/salaosenac", cargoRoutes);
    }
}