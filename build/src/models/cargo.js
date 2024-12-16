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
exports.Cargo = void 0;
const typeorm_1 = require("typeorm");
const funcionario_1 = require("./funcionario");
let Cargo = class Cargo {
    constructor(cbo, nome, salario) {
        this.cbo = cbo;
        this.nome = nome;
        this.salario = salario;
    }
};
exports.Cargo = Cargo;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: "varchar", length: 7 }),
    __metadata("design:type", String)
], Cargo.prototype, "cbo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 45, nullable: false, unique: true }),
    __metadata("design:type", String)
], Cargo.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", { precision: 6, scale: 2, nullable: false }),
    __metadata("design:type", Number)
], Cargo.prototype, "salario", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => funcionario_1.Funcionario, (funcionario) => funcionario.cargo, { cascade: true }),
    __metadata("design:type", Array)
], Cargo.prototype, "funcionarios", void 0);
exports.Cargo = Cargo = __decorate([
    (0, typeorm_1.Entity)("cargo"),
    __metadata("design:paramtypes", [String, String, Number])
], Cargo);
