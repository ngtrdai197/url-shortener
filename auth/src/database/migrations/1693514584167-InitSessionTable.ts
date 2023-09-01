import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSessionTable1693514584167 implements MigrationInterface {
    name = 'InitSessionTable1693514584167'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "session" ("id" uuid NOT NULL, "user_id" integer NOT NULL, "refresh_token" character varying NOT NULL, "is_blocked" smallint NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "session"`);
    }

}
