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
exports.Agendamento = void 0;
const typeorm_1 = require("typeorm");
const cliente_1 = require("./cliente");
const funcionario_1 = require("./funcionario");
const agendamento_servicos_1 = require("./agendamento_servicos");
let Agendamento = class Agendamento {
    constructor(id, data, horario, valorTotal, cliente, funcionario) {
        this.id_agendamento = id;
        this.datas = data;
        this.horario = horario;
        this.valorTotal = valorTotal;
        this.cliente = cliente;
        this.funcionario = funcionario;
    }
};
exports.Agendamento = Agendamento;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int' }),
    __metadata("design:type", Number)
], Agendamento.prototype, "id_agendamento", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], Agendamento.prototype, "datas", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time' }),
    __metadata("design:type", String)
], Agendamento.prototype, "horario", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 6, scale: 2 }),
    __metadata("design:type", Number)
], Agendamento.prototype, "valorTotal", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cliente_1.Cliente, (cliente) => cliente.agendamentos, { onUpdate: 'CASCADE', onDelete: 'CASCADE', nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'cliente_cpf' }),
    __metadata("design:type", cliente_1.Cliente)
], Agendamento.prototype, "cliente", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => funcionario_1.Funcionario, (funcionario) => funcionario.agendamentos, { onUpdate: 'CASCADE', onDelete: 'CASCADE', nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'funcionario_cpf_funcionario' }),
    __metadata("design:type", funcionario_1.Funcionario)
], Agendamento.prototype, "funcionario", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => agendamento_servicos_1.AgendamentoServicos, (agendamentoservicos) => agendamentoservicos.agendamento, { cascade: true }),
    __metadata("design:type", Array)
], Agendamento.prototype, "agendamentoservicos", void 0);
exports.Agendamento = Agendamento = __decorate([
    (0, typeorm_1.Entity)('agendamento'),
    __metadata("design:paramtypes", [Number, String, String, Number, cliente_1.Cliente, funcionario_1.Funcionario])
], Agendamento);
