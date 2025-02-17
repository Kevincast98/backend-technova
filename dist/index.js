"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const activityRoutes_1 = __importDefault(require("./routes/activityRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// Configurar CORS
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use((0, cors_1.default)(corsOptions));
// Middleware para parsear JSON
app.use(express_1.default.json());
// Configuración de la conexión a Postgres
(0, typeorm_1.createConnection)({
    type: "postgres",
    host: "technova.c9qa6suo85gt.us-east-1.rds.amazonaws.com",
    port: 5432,
    username: "postgres",
    password: "k3mba1234",
    database: "technova",
    entities: [__dirname + "/dist/entities/**/*.js"],
    synchronize: false,
    logging: false,
    ssl: { rejectUnauthorized: false },
}).then(() => {
    console.log('Conexión a la base de datos establecida.');
    // Registrar rutas
    app.use('/activities', activityRoutes_1.default);
    // Levantar servidor
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
}).catch(error => console.error('Error en la conexión a la DB:', error));
