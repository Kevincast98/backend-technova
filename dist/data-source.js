"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "technova.c9qa6suo85gt.us-east-1.rds.amazonaws.com",
    port: 5432,
    username: "postgres",
    password: "k3mba1234",
    database: "technova",
    synchronize: false,
    logging: true,
    entities: ["dist/entities/**/*.js"], // Cambiado a .js
    migrations: ["dist/migrations/**/*.js"], // Cambiado a .js
    ssl: { rejectUnauthorized: false },
});
exports.AppDataSource.initialize()
    .then(() => console.log("Data Source initialized"))
    .catch((error) => console.error("Error initializing Data Source", error));
