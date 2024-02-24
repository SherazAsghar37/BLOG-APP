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
const crypto_1 = require("crypto");
const tsyringe_1 = require("tsyringe");
let HashPassword = class HashPassword {
    constructor() {
        this.hash = (password) => {
            const salt = (0, crypto_1.randomBytes)(16).toString();
            password = (0, crypto_1.createHmac)("sha256", salt).update(password).digest("hex");
            return { password, salt };
        };
        this.deHash = (password, salt) => {
            password = (0, crypto_1.createHmac)("sha256", salt).update(password).digest("hex");
            return password;
        };
    }
};
HashPassword = __decorate([
    (0, tsyringe_1.singleton)(),
    __metadata("design:paramtypes", [])
], HashPassword);
exports.default = HashPassword;
