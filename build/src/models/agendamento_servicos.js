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
exports.AgendamentoServicos = void 0;
const typeorm_1 = require("typeorm");
const agendamento_1 = require("./agendamento");
const servicos_1 = require("./servicos");
const funcionario_1 = require("./funcionario");
let AgendamentoServicos = class AgendamentoServicos {
    constructor(agendamento_id_agendamento, servicos_idservicos, funcionario_cpf_funcionario, quantidade, valorVenda) {
        this.agendamento_id_agendamento = agendamento_id_agendamento;
        this.servicos_idservicos = servicos_idservicos;
        this.funcionario_cpf_funcionario = funcionario_cpf_funcionario;
        this.valorVenda = valorVenda;
    }
};
exports.AgendamentoServicos = AgendamentoServicos;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], AgendamentoServicos.prototype, "agendamento_id_agendamento", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], AgendamentoServicos.prototype, "servicos_idservicos", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: "varchar", length: 14 }),
    __metadata("design:type", String)
], AgendamentoServicos.prototype, "funcionario_cpf_funcionario", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => agendamento_1.Agendamento, agendamento => agendamento.id_agendamento, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'agendamento_id_agendamento' }),
    __metadata("design:type", agendamento_1.Agendamento)
], AgendamentoServicos.prototype, "agendamento", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => servicos_1.Servicos, servico => servico.idservicos, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'servicos_idservicos' }),
    __metadata("design:type", servicos_1.Servicos)
], AgendamentoServicos.prototype, "servico", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => funcionario_1.Funcionario, funcionario => funcionario.cpf_funcionario, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'funcionario_cpf_funcionario' }),
    __metadata("design:type", funcionario_1.Funcionario)
], AgendamentoServicos.prototype, "funcionario", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 6, scale: 2 }),
    __metadata("design:type", Number)
], AgendamentoServicos.prototype, "valorVenda", void 0);
exports.AgendamentoServicos = AgendamentoServicos = __decorate([
    (0, typeorm_1.Entity)('agendamento_servicos'),
    __metadata("design:paramtypes", [Number, Number, String, Number, Number])
], AgendamentoServicos);
