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
exports.Funcionario = void 0;
const typeorm_1 = require("typeorm");
const cargo_1 = require("./cargo");
const agendamento_1 = require("./agendamento");
const agendamento_servicos_1 = require("./agendamento_servicos");
let Funcionario = class Funcionario {
    constructor(cpf_func, name) {
        this.cpf_funcionario = cpf_func;
        this.nome = name;
    }
};
exports.Funcionario = Funcionario;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: 14 }),
    __metadata("design:type", String)
], Funcionario.prototype, "cpf_funcionario", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 45, nullable: false }),
    __metadata("design:type", String)
], Funcionario.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cargo_1.Cargo, (cargo) => cargo.funcionarios, { onUpdate: 'CASCADE', onDelete: 'CASCADE', nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'cargo_cbo' }),
    __metadata("design:type", cargo_1.Cargo)
], Funcionario.prototype, "cargo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => agendamento_1.Agendamento, (agendamento) => agendamento.funcionario, { cascade: true }),
    __metadata("design:type", Array)
], Funcionario.prototype, "agendamentos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => agendamento_servicos_1.AgendamentoServicos, (agendamentoservicos) => agendamentoservicos.funcionario, { cascade: true }),
    __metadata("design:type", Array)
], Funcionario.prototype, "agendamentoservicos", void 0);
exports.Funcionario = Funcionario = __decorate([
    (0, typeorm_1.Entity)('funcionario'),
    __metadata("design:paramtypes", [String, String])
], Funcionario);
