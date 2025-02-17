import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1739559826374 implements MigrationInterface {
    name = 'CreateUsersTable1739559826374'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "activity" ("id" SERIAL NOT NULL, "usuario" character varying NOT NULL, "proyecto" character varying NOT NULL, "compania" character varying NOT NULL, "tipo" character varying NOT NULL, "descripcion" text NOT NULL, "minutos" integer NOT NULL, "fecha" date NOT NULL, "equipo" character varying NOT NULL, CONSTRAINT "PK_24625a1d6b1b089c8ae206fe467" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "activity"`);
    }

}
