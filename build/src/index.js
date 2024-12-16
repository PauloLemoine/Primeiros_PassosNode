"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./db/data_source");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes/routes"));
class Server {
    constructor(app) {
        this.config(app);
        new routes_1.default(app);
    }
    config(app) {
        const corsOptions = {
            origin: "http://localhost:8081"
        };
        app.use((0, cors_1.default)(corsOptions));
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: true }));
    }
}
exports.default = Server;
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log(`Database is running.`);
})
    .catch((error) => console.log(error));
