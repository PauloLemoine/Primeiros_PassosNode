"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cargo_routes_1 = __importDefault(require("./cargo.routes"));
const funcionario_routes_1 = __importDefault(require("./funcionario.routes"));
class Routes {
    constructor(app) {
        app.use("/salaosenac", funcionario_routes_1.default);
        app.use("/salaosenac", cargo_routes_1.default);
    }
}
exports.default = Routes;
