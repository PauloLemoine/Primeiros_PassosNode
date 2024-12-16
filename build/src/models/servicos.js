"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Servicos = void 0;
const typeorm_1 = require("typeorm");
const agendamento_servicos_1 = require("./agendamento_servicos");
let Servicos = class Servicos {
    constructor(id, nome, valor) {
        this.idservicos = id;
        this.nome = nome;
        this.valor = valor;
    }
};
exports.Servicos = Servicos;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int" }),
    __metadata("design:type", Number)
], Servicos.prototype, "idservicos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 45, nullable: false, unique: true }),
    __metadata("design:type", String)
], Servicos.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", { precision: 5, scale: 2, nullable: false }),
    __metadata("design:type", Number)
], Servicos.prototype, "valor", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => agendamento_servicos_1.AgendamentoServicos, (agendamentoservicos) => agendamentoservicos.servico, { cascade: true }),
    __metadata("design:type", Array)
], Servicos.prototype, "agendamentoservicos", void 0);
exports.Servicos = Servicos = __decorate([
    (0, typeorm_1.Entity)("servicos"),
    __metadata("design:paramtypes", [Number, String, Number])
], Servicos);
