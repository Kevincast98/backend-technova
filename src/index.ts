import "reflect-metadata";
import { createConnection } from 'typeorm';
import express from 'express';
import activityRoutes from './routes/activityRoutes';

import cors from 'cors';

const app = express();

// Configurar CORS
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
};

app.use(cors(corsOptions));

// Middleware para parsear JSON
app.use(express.json());

// Configuración de la conexión a Postgres
createConnection({
  type: "postgres",
  host: "technova.c9qa6suo85gt.us-east-1.rds.amazonaws.com",
  port: 5432,
  username: "postgres",
  password: "k3mba1234",
  database: "technova",
  entities: [__dirname + '/entities/*.ts'],
  synchronize: false,
  logging: false,
  ssl: {rejectUnauthorized: false},

}).then(() => {
  console.log('Conexión a la base de datos establecida.');

  // Registrar rutas
  app.use('/activities', activityRoutes);

  // Levantar servidor
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
}).catch(error => console.error('Error en la conexión a la DB:', error));