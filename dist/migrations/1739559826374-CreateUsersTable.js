"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsersTable1739559826374 = void 0;
class CreateUsersTable1739559826374 {
    constructor() {
        this.name = 'CreateUsersTable1739559826374';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "activity" ("id" SERIAL NOT NULL, "usuario" character varying NOT NULL, "proyecto" character varying NOT NULL, "compania" character varying NOT NULL, "tipo" character varying NOT NULL, "descripcion" text NOT NULL, "minutos" integer NOT NULL, "fecha" date NOT NULL, "equipo" character varying NOT NULL, CONSTRAINT "PK_24625a1d6b1b089c8ae206fe467" PRIMARY KEY ("id"))`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE "activity"`);
        });
    }
}
exports.CreateUsersTable1739559826374 = CreateUsersTable1739559826374;
