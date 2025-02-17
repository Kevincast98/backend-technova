import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "technova.c9qa6suo85gt.us-east-1.rds.amazonaws.com",
  port: 5432,
  username: "postgres", 
  password: "k3mba1234", 
  database: "technova",
  synchronize: false,
  logging: true,
  entities: ["src/entities/**/*.ts"], 
  migrations: ["src/migrations/**/*.ts"],
  ssl: {rejectUnauthorized: false},
});

AppDataSource.initialize()
  .then(() => console.log("Data Source initialized"))
  .catch((error) => console.error("Error initializing Data Source", error));